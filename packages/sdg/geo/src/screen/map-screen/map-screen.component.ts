import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Params } from '@angular/router';

import { ActionbarComponent } from '@igo2/common/action';
import { type EntityRecord } from '@igo2/common/entity';
import {
  SpinnerActivityDirective,
  SpinnerComponent
} from '@igo2/common/spinner';
import { ConfigService } from '@igo2/core/config';
import { IgoLanguageModule, LanguageService } from '@igo2/core/language';
import {
  FEATURE,
  FilterableDataSourcePipe,
  IgoMap,
  IgoSearchModule,
  QueryService,
  Research,
  SearchBarComponent,
  SearchResult,
  SearchSource,
  SearchSourceService,
  computeOlFeaturesExtent,
  provideOptionsApi,
  provideSearch,
  sourceCanReverseSearch,
  sourceCanSearch,
  withCadastreSource,
  withCoordinatesReverseSource,
  withIChercheReverseSource,
  withIChercheSource,
  withNominatimSource,
  withStoredQueriesSource
} from '@igo2/geo';
import { QueryState, SearchState } from '@igo2/integration';

import olFormatGeoJSON from 'ol/format/GeoJSON';

import { debounceTime, skipWhile, take } from 'rxjs/operators';

import { FilterButtonComponent } from '../../filter';
import { LegendButtonComponent } from '../../legend';
import { IMapConfig, MapBrowserComponent } from '../../map';
import { MapScreenPanelComponent } from './map-screen-panel/map-screen-panel.component';
import { PanelType } from './shared/map-screen.interface';

const DEFAULT_PANEL_TYPE: PanelType = 'search';

@Component({
  selector: 'sdg-map-screen',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatExpansionModule,
    IgoSearchModule,
    FilterableDataSourcePipe,
    MapBrowserComponent,
    MapScreenPanelComponent,
    FilterButtonComponent,
    LegendButtonComponent,
    ActionbarComponent,
    IgoLanguageModule,
    SpinnerComponent,
    SpinnerActivityDirective
  ],
  providers: [
    provideSearch(
      [
        withNominatimSource(),
        withIChercheSource(),
        withIChercheReverseSource(),
        withCoordinatesReverseSource(),
        withStoredQueriesSource(),
        withCadastreSource()
      ],
      { analytics: true }
    ),
    provideOptionsApi(),
    SearchState
  ],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.scss'
})
export class MapScreenComponent implements OnInit {
  public config: IMapConfig; // TODO: C'est quoi la stratégie pour cette interface? Ça pourrait faire du sens d'avoir une abstraction de la confiugration d'une carte dans SDG versus IGO mais il faudrait qu'elle soit associer dans le EnvironmentOptions
  public hasFooter: boolean;
  public showSearchBar: boolean;

  private termDefinedInUrl = false;
  private termDefinedInUrlTriggered = false;

  panelOpened = signal(false);
  panelType = signal<PanelType>(DEFAULT_PANEL_TYPE);
  map = signal<IgoMap | undefined>(undefined);
  hasOgcDatasource = signal(false);

  isHandset = input.required<boolean>();

  @ViewChild('searchbar') searchBar?: SearchBarComponent;

  constructor(
    private route: ActivatedRoute,
    public searchState: SearchState,
    public queryState: QueryState,
    private searchSourceService: SearchSourceService,
    private configService: ConfigService,
    private languageService: LanguageService,
    private queryService: QueryService
  ) {
    this.config = this.configService.getConfigs();
    this.showSearchBar = this.config.searchBar?.showSearchBar ?? true;
    this.hasFooter = this.config.hasFooter ?? true;
  }

  ngOnInit() {
    this.queryService.defaultFeatureCount = 1;

    this.route.queryParams.subscribe((params) => {
      this.readLanguageParam(params);
      this.readSearchParams(params);
      this.readFocusFirst(params);
    });
  }

  handleMap(map: IgoMap): void {
    this.map.set(map);
  }

  openPanel(type: PanelType = DEFAULT_PANEL_TYPE): void {
    if (this.panelType() !== type) {
      this.panelType.set(type);
    }
    this.panelOpened.set(true);
  }

  closePanel(): void {
    this.panelOpened.set(false);
  }

  togglePanel(type?: PanelType) {
    const typeChanged = type && type !== this.panelType();

    typeChanged
      ? this.panelType.set(type)
      : this.panelOpened.update((value) => !value);
  }

  handleFeaturesQuery(results: SearchResult[]): void {
    if (!results.length) {
      return;
    }
    this.openPanel('query');
  }

  onSearchTermChange(term?: string) {
    // if (params?.search && term !== params.search) {
    //   this.searchState.deactivateCustomFilterTermStrategy();
    // }
    this.searchState.setSearchTerm(term ?? '');
    // const termWithoutHashtag = term.replace(/(#[^\s]*)/g, '').trim();
    // if (termWithoutHashtag.length < 2) {
    //   this.onClearSearch();
    //   return;
    // }
  }

  onSearch(event: { research: Research; results: SearchResult[] }) {
    this.openPanel('search');

    const results = event.results;

    const isReverseSearch = !sourceCanSearch(event.research.source);

    let enabledSources: SearchSource[];
    if (isReverseSearch) {
      enabledSources = this.searchSourceService
        .getEnabledSources()
        .filter(sourceCanReverseSearch);
    } else {
      enabledSources = this.searchSourceService
        .getEnabledSources()
        .filter(sourceCanSearch);
    }

    const newResults = this.searchState.store.entities$.value
      .filter(
        (result: SearchResult) =>
          result.source !== event.research.source &&
          enabledSources.includes(result.source)
      )
      .concat(results);
    this.searchState.store.updateMany(newResults);
  }

  clearSearch() {
    this.map()?.searchResultsOverlay.clear();
    this.searchState.store.clear();
    this.searchState.setSelectedResult(undefined as any);
    this.searchState.deactivateCustomFilterTermStrategy();
    this.searchState.setSearchTerm('');
  }

  private readLanguageParam(params: Params) {
    const lang = params['lang'];
    if (lang) {
      this.languageService.setLanguage(lang);
    }
  }

  private computeFocusFirst() {
    setTimeout(() => {
      const resultItem: HTMLElement = document
        .getElementsByTagName('igo-search-results-item')
        .item(0) as HTMLElement;
      if (resultItem) {
        resultItem.click();
      }
    }, 1);
  }

  private readFocusFirst(params: Params) {
    if (params['sf'] === '1' && this.termDefinedInUrl) {
      const entities$$ = this.searchState.store.stateView
        .all$()
        .pipe(
          skipWhile((entities) => entities.length === 0),
          debounceTime(1000),
          take(1)
        )
        .subscribe((entities) => {
          entities$$.unsubscribe();
          if (entities.length && !this.termDefinedInUrlTriggered) {
            this.computeFocusFirst();
            this.termDefinedInUrlTriggered = true;
          }
        });
    }
  }

  private readSearchParams(params: Params) {
    const map = this.map();
    const searchParam = params['search'];
    if (searchParam) {
      this.termDefinedInUrl = true;
      if (params['exactMatch'] === '1') {
        this.searchState.activateCustomFilterTermStrategy();
      }
      if (searchParam && !params['zoom'] && params['sf'] !== '1') {
        const entities$$ = this.searchState.store.stateView
          .all$()
          .pipe(
            skipWhile((entities) => entities.length === 0),
            debounceTime(500),
            take(1)
          )
          .subscribe((entities) => {
            entities$$.unsubscribe();
            const searchResultsOlFeatures = entities
              .filter((e) => e.entity.meta.dataType === FEATURE)
              .map((entity: EntityRecord<SearchResult>) =>
                new olFormatGeoJSON().readFeature(entity.entity.data, {
                  dataProjection: entity.entity.data['projection'],
                  featureProjection: map?.projectionCode
                })
              );
            if (map) {
              const totalExtent = computeOlFeaturesExtent(
                searchResultsOlFeatures,
                map.viewProjection
              );
              map.viewController.zoomToExtent(totalExtent);
            }
          });
      }
      this.searchState.searchTerm$.next(searchParam);
    }
    if (params['searchGeom'] === '1') {
      this.searchState.searchResultsGeometryEnabled$.next(true);
    }
  }
}
