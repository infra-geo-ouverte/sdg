import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  DestroyRef,
  OnInit,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal
} from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  PanelService,
  SdgFullMapSkeleton,
  SdgPanelContentDirective,
  SdgSearchResults,
  SearchResult,
  SearchResultGroup,
  SearchService,
  SearchSource,
  TextSearch,
  provideSearch,
  withIChercheSource,
  withTerrapiSource
} from '@igo2/sdg-carto';
import { SdgSearchBar, WithLabels } from '@igo2/sdg-common';

import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { SdgOlMap, SdgOlSearchHighlight } from '../shared';
import { SdgOlFullMapBrowser } from './browser';
import {
  SDG_OL_FULL_MAP_LABELS,
  SdgOlFullMapLabels,
  SdgOlFullMapOptions
} from './full-map';
import { SdgScaleLine } from './scale-line/scale-line.component';

@Component({
  selector: 'sdg-ol-full-map',
  imports: [
    CommonModule,
    NgTemplateOutlet,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatExpansionModule,
    SdgOlFullMapBrowser,
    MatProgressSpinnerModule,
    SdgSearchBar,
    SdgSearchResults,
    SdgFullMapSkeleton,
    MatFormFieldModule,
    SdgScaleLine
  ],
  providers: [provideSearch(withIChercheSource(), withTerrapiSource())],
  templateUrl: './full-map.component.html',
  styleUrl: './full-map.component.scss'
})
export class SdgOlFullMap
  extends WithLabels<SdgOlFullMapLabels>
  implements OnInit, AfterContentInit
{
  private readonly destroyRef = inject(DestroyRef);

  readonly panelService = inject(PanelService);
  private readonly searchService = inject(SearchService);

  readonly panelContents = contentChildren(SdgPanelContentDirective);

  readonly options = input.required<SdgOlFullMapOptions>();
  readonly isHandset = input.required<boolean>();

  readonly mapReady = output<SdgOlMap>();
  readonly extentChange = output<void>();
  readonly searchChange = output<string>();
  readonly resultSelect = output<SearchResult>();

  readonly map = signal<SdgOlMap | undefined>(undefined);
  readonly searchTerm = signal<string>('');

  private searchHighlight: SdgOlSearchHighlight | undefined;

  private readonly extraResultsBySource = signal<Map<string, SearchResult[]>>(
    new Map()
  );
  private readonly currentPageBySource = signal<Map<string, number>>(new Map());

  /** Groups of results, one per registered source. Each group exposes a `loading` flag. */
  readonly searchGroups = toSignal(
    toObservable(this.searchTerm).pipe(
      tap(() => {
        this.extraResultsBySource.set(new Map());
        this.currentPageBySource.set(new Map());
      }),
      switchMap((term) =>
        term.trim()
          ? this.searchService.smartSearch(term)
          : of<SearchResultGroup[]>([])
      )
    ),
    { initialValue: [] as SearchResultGroup[] }
  );

  /** Groups merged with any extra pages loaded via the "load more" button. */
  readonly displayedGroups = computed(() => {
    const groups = this.searchGroups();
    const extra = this.extraResultsBySource();
    const pages = this.currentPageBySource();
    return groups.map((group): SearchResultGroup => {
      const extraForSource = extra.get(group.source.id);
      const page = pages.get(group.source.id);
      const results = extraForSource?.length
        ? [...group.results, ...extraForSource]
        : group.results;
      return { ...group, results, ...(page !== undefined ? { page } : {}) };
    });
  });

  /** True while at least one source is still fetching results. */
  readonly resultsLoading = computed(() =>
    this.searchGroups().some((g) => g.loading)
  );

  /**
   * True when the consumer projected a `<ng-template sdgPanelContent="search">`.
   * In that case the default `SdgSearchResults` panel is suppressed.
   */
  readonly hasCustomSearchPanel = computed(() =>
    this.panelContents().some((c) => c.type() === 'search')
  );

  constructor() {
    super(undefined, SDG_OL_FULL_MAP_LABELS);

    effect(() => {
      const map = this.map();
      const bottomPadding = this.isHandset()
        ? this.panelService.visibleHeight()
        : 0;
      if (map) {
        map.view.padding = [0, 0, bottomPadding, 0];
      }
    });
  }

  get defaultPanel(): string | undefined {
    return this.options().sidepanel?.defaultPanel;
  }

  ngOnInit(): void {
    if (this.defaultPanel) {
      this.panelService.setDefaultType(this.defaultPanel);
    }

    if (this.isHandset()) {
      this.panelService.expanded.set(false);
    }
  }

  ngAfterContentInit(): void {
    if (this.options().search === false && !this.defaultPanel) {
      const firstPanel = this.panelContents()[0];
      if (!firstPanel) {
        throw new Error(
          'SdgOlFullMap: search is disabled but no defaultPanel or panel content is provided.'
        );
      }
      this.panelService.setType(firstPanel.type());
    }
  }

  onResultSelect(result: SearchResult): void {
    this.searchHighlight?.highlight(result);
    this.resultSelect.emit(result);
  }

  onLoadMore(group: SearchResultGroup): void {
    if (!('search' in group.source)) return;
    const source = group.source as SearchSource & TextSearch;

    const currentPage = this.currentPageBySource().get(group.source.id) ?? 1;
    const nextPage = currentPage + 1;
    this.currentPageBySource.update((m) =>
      new Map(m).set(group.source.id, nextPage)
    );

    source
      .search(this.searchTerm(), { page: nextPage })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((results) => {
        this.extraResultsBySource.update((map) => {
          const newMap = new Map(map);
          const existing = newMap.get(group.source.id) ?? [];
          newMap.set(group.source.id, [...existing, ...results]);
          return newMap;
        });
      });
  }

  handleMap(map: SdgOlMap): void {
    this.map.set(map);
    this.searchHighlight = new SdgOlSearchHighlight(map);
    this.mapReady.emit(map);
  }

  onSearchChange(term?: string): void {
    const cleanTerm = term?.trim() ?? '';
    this.searchTerm.set(cleanTerm);

    if (cleanTerm && this.panelService.type() !== 'search') {
      this.panelService.toggle('search');
    } else if (cleanTerm && !this.panelService.expanded()) {
      this.panelService.expanded.set(true);
    } else if (!cleanTerm && this.panelService.type() === 'search') {
      this.searchHighlight?.clear();
    }

    this.searchChange.emit(cleanTerm);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.searchHighlight?.clear();

    if (this.panelService.expanded()) {
      this.navigateToDefaultPanel();
    } else {
      this.panelService.resetDefaultType();
    }

    if (this.isHandset()) {
      this.panelService.expanded.set(false);
    }
  }
  private navigateToDefaultPanel(): void {
    if (this.defaultPanel) {
      this.panelService.toggle(this.defaultPanel);
    } else {
      this.panelService.expanded.set(false);
    }
  }
}
