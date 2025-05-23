import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Signal,
  computed,
  input,
  signal,
  viewChild,
  viewChildren
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabLink, MatTabNav, MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  BreakpointService,
  TitleResolverPipe,
  resolveTitle
} from '@igo2/sdg-core';

import { Observable, Subject, filter, shareReplay, takeUntil } from 'rxjs';

import { INavigationLink, INavigationLinks } from './navigation.interface';

const TABS_MIN_DISPLAYED = 2 as const;

@Component({
  selector: 'sdg-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    TitleResolverPipe
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  linksInTabs = signal<INavigationLinks>([]);
  linksInMore = signal<INavigationLinks>([]);
  hasOverflow = signal(false);
  hasActions = signal(false);

  isHandset: Signal<boolean>;

  readonly isOnTwoLine = computed(
    () => this.hasActions() && this.isHandset() && this.detectHandsetOverflow()
  );

  readonly links = input.required<INavigationLinks>();
  readonly headerContainerClass = input<string>();

  private headerRow = viewChild<ElementRef<HTMLElement>>('headerRow');
  private tabsSection = viewChild<ElementRef<HTMLElement>>('tabsSection');
  private tabsNavbarSection = viewChild<MatTabNav>(MatTabNav);
  private tabsLinks = viewChildren<MatTabLink>(MatTabLink);
  private actionsSection = viewChild<ElementRef<HTMLElement>>('actionsSection');

  private _resizeObserver: ResizeObserver;
  private _resizeSubject = new Subject<ResizeObserverEntry[]>();
  private _destroyed = new Subject<void>();

  constructor(
    private host: ElementRef,
    private breakpointService: BreakpointService
  ) {
    this.isHandset = this.breakpointService.isHandset;

    this._resizeObserver = new ResizeObserver((entries) =>
      this._resizeSubject.next(entries)
    );
  }

  ngOnInit(): void {
    this.linksInTabs.set(this.links());
  }

  ngAfterViewInit(): void {
    this.observeHostResize().subscribe(() => {
      this.handleResize();
    });

    this.hasActions.set(
      !!this.actionsSection()?.nativeElement.childElementCount
    );
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  private handleResize(): void {
    const hasTabsOverflow = this.hasTabsOverflow();

    const links = this.links();
    if (!hasTabsOverflow) {
      this.linksInTabs.set(links);
      this.linksInMore.set([]);
      return;
    }

    const index = this.findLastIndexToDisplay();
    if (!index) {
      return;
    }

    this.linksInTabs.set(links.slice(0, index));
    this.linksInMore.set(links.slice(index));
  }

  private findLastIndexToDisplay(): number | undefined {
    const tabsSection = this.tabsSection();
    if (!tabsSection) {
      return;
    }

    const tabClearence = this.isHandset() ? 4 : 8;
    const moreButtonWidth = (this.isHandset() ? 80 : 104) + tabClearence;
    const maxWidth = tabsSection.nativeElement.clientWidth - moreButtonWidth;
    const tabsLinks = this.tabsLinks();
    const links = this.links();

    let index = 0;
    let accWidth = 0;
    while (accWidth < maxWidth) {
      const link = links[index];
      if (!link) {
        break;
      }

      const element = tabsLinks[index]?.elementRef.nativeElement as HTMLElement;
      const elementWidth = element?.clientWidth ?? this.estimateLinkWidth(link);

      accWidth += elementWidth;
      if (accWidth > maxWidth) {
        break;
      }

      index++;
    }

    return Math.max(index, TABS_MIN_DISPLAYED);
  }

  // Estimate the width base on the first rendered link
  private estimateLinkWidth(link: INavigationLink): number {
    const baseLink = this.links()[0];
    const baseWidth = this.tabsLinks()[0]?.elementRef.nativeElement
      .clientWidth as number;

    const baseTitleLength = resolveTitle(baseLink)?.length ?? 0;
    const titleLength = resolveTitle(link)?.length ?? 0;

    return (baseWidth * titleLength) / baseTitleLength;
  }

  private hasTabsOverflow(): boolean {
    const tabNavbarWidth =
      this.tabsNavbarSection()?._tabListContainer.nativeElement.clientWidth ??
      0;
    const linksEstimatedWidth = this.getTabsItemsWidth();
    const hasOverflow = linksEstimatedWidth > tabNavbarWidth;
    this.hasOverflow.set(hasOverflow);
    return hasOverflow;
  }

  private detectHandsetOverflow(): boolean {
    const headerRowWidth = this.headerRow()?.nativeElement.clientWidth ?? 0;
    const linksEstimatedWidth = this.getTabsItemsWidth();
    const actionsItemsWidth = this.getActionsItemsWidth();

    const hasOverflow =
      linksEstimatedWidth + actionsItemsWidth > headerRowWidth;

    return hasOverflow;
  }

  private getTabsItemsWidth(): number {
    const tabsLinks = this.tabsLinks();

    return this.links().reduce((accWidth, link, index) => {
      const element = tabsLinks[index]?.elementRef.nativeElement as HTMLElement;
      const elementWidth = element?.clientWidth ?? this.estimateLinkWidth(link);

      accWidth += elementWidth;
      return accWidth;
    }, 0);
  }

  private getActionsItemsWidth(): number {
    const actionsElement = this.actionsSection()?.nativeElement;
    if (!actionsElement?.children) {
      return 0;
    }
    return this.getItemsWidth(Array.from(actionsElement.children));
  }

  private getItemsWidth(collection: Element[]): number {
    const first = collection[0];
    const last = collection[collection.length - 1];

    const right = (last ?? first)?.getBoundingClientRect().right ?? 0;
    const left = first?.getBoundingClientRect().left ?? 0;
    return right - left;
  }

  private observeHostResize(): Observable<ResizeObserverEntry[]> {
    const target = this.host.nativeElement;
    return new Observable<ResizeObserverEntry[]>((observer) => {
      const subscription = this._resizeSubject.subscribe(observer);
      this._resizeObserver.observe(target);
      return () => {
        this._resizeObserver.unobserve(target);
        subscription.unsubscribe();
      };
    }).pipe(
      filter((entries) => entries.some((entry) => entry.target === target)),
      // Share a replay of the last event so that subsequent calls to observe the same element
      // receive initial sizing info like the first one. Also enable ref counting so the
      // element will be automatically unobserved when there are no more subscriptions.
      shareReplay({ bufferSize: 1, refCount: true }),
      takeUntil(this._destroyed)
    );
  }
}
