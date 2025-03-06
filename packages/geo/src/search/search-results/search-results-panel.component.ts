import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { IgoLanguageModule } from '@igo2/core/language';
import {
  FeatureMotion,
  IgoMap,
  Research,
  SearchResult,
  SearchResultsComponent
} from '@igo2/geo';
import { SearchState } from '@igo2/integration';

import {
  onResultFocus,
  onResultSelect,
  onResultUnfocus
} from './search-results-panel.utils';

enum SearchResultAction {
  Focus = 'focus',
  Select = 'select',
  Unfocus = 'unfocus'
}

@Component({
  selector: 'sdg-search-results-panel',
  templateUrl: './search-results-panel.component.html',
  styleUrls: ['./search-results-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IgoLanguageModule, SearchResultsComponent, AsyncPipe]
})
export class SearchResultPanelComponent {
  map = input.required<IgoMap>();
  searchState = input.required<SearchState>();

  closed = output<boolean>();

  public searchResultActionEnum = SearchResultAction;

  onResult(searchResultAction: SearchResultAction, searchResult: SearchResult) {
    const searchState = this.searchState();
    const map = this.map();
    switch (searchResultAction) {
      case SearchResultAction.Focus:
        onResultFocus(searchResult, map, searchState, {
          featureMotion: FeatureMotion.None
        });
        break;
      case SearchResultAction.Select:
        map.searchResultsOverlay.clear();
        onResultSelect(searchResult, map, searchState);
        this.close();
        break;
      case SearchResultAction.Unfocus:
        onResultUnfocus(searchResult, map);
        break;
    }
  }

  onMoreResults(event: { research: Research; results: SearchResult[] }) {
    const searchState = this.searchState();
    const results = event.results;
    searchState.store.state.updateAll({
      focused: false,
      selected: false
    });
    const newResults = searchState.store.entities$.value
      .filter((result: SearchResult) => result.source !== event.research.source)
      .concat(results);
    searchState.store.updateMany(newResults);
  }

  private close(): void {
    this.closed.emit(true);
  }
}
