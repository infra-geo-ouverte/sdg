import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { SearchResult } from '../../shared/search-source.interface';

@Component({
  selector: 'sdg-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrl: './search-results-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, MatIconModule]
})
export class SdgSearchResultsItem {
  readonly result = input.required<SearchResult>();
  readonly hovered = input(false);
  readonly selected = input(false);

  readonly select = output<SearchResult>();
  readonly hover = output<SearchResult>();
  readonly unhover = output<SearchResult>();
}
