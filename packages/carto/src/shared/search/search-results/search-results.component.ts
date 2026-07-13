import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { WithLabels } from '@igo2/sdg-common';

import {
  DEFAULT_SEARCH_LABELS,
  SEARCH_LABELS,
  SearchLabels
} from '../shared/search';
import {
  SearchResult,
  SearchResultGroup
} from '../shared/search-source.interface';
import { SdgSearchResultItem } from './search-result-item.component';

@Component({
  selector: 'sdg-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    SdgSearchResultItem
  ]
})
export class SdgSearchResults extends WithLabels<SearchLabels> {
  readonly groups = input.required<SearchResultGroup[]>();

  readonly resultSelect = output<SearchResult>();
  readonly resultFocus = output<SearchResult>();
  readonly resultUnfocus = output<SearchResult>();
  readonly loadMore = output<SearchResultGroup>();

  readonly focusedResult = signal<SearchResult | undefined>(undefined);
  readonly selectedResult = signal<SearchResult | undefined>(undefined);

  /**
   * True when there is at most one real source (CoordinatesSource excluded).
   * In that case the accordion header adds no value and a flat list is shown.
   */
  readonly isSingleSource = computed(
    () => this.groups().filter((g) => g.source.id !== 'coordinates').length <= 1
  );

  constructor() {
    super(DEFAULT_SEARCH_LABELS, SEARCH_LABELS);
  }

  isFocused(result: SearchResult): boolean {
    return this.focusedResult() === result;
  }

  isSelected(result: SearchResult): boolean {
    return this.selectedResult() === result;
  }

  onResultFocus(result: SearchResult): void {
    this.focusedResult.set(result);
    this.resultFocus.emit(result);
  }

  onResultUnfocus(result: SearchResult): void {
    if (this.focusedResult() === result) {
      this.focusedResult.set(undefined);
    }
    this.resultUnfocus.emit(result);
  }

  onResultSelect(result: SearchResult): void {
    this.selectedResult.set(result);
    this.resultSelect.emit(result);
  }

  groupHasMore(group: SearchResultGroup): boolean {
    const limit = +(group.source.params?.limit ?? 0);
    /**
     * @todo
     * When the last page is exactly full (e.g., 10 results, limit 10), "load more" will still appear. Consider tracking hasNextPage from the API response instead.
     * ICherche and Terrapi need to return this information
     */
    return (
      limit > 0 &&
      !group.loading &&
      group.results.length > 0 &&
      group.results.length % limit === 0 &&
      (group.page ?? 0) < 30
    );
  }

  onLoadMore(group: SearchResultGroup): void {
    this.loadMore.emit(group);
  }
}
