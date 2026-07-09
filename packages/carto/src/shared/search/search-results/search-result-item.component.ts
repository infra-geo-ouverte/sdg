import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SearchResult } from '../shared/search-source.interface';

@Component({
  selector: 'sdg-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, MatIconModule, MatTooltipModule]
})
export class SdgSearchResultItem {
  readonly result = input.required<SearchResult>();
  readonly focused = input(false);
  readonly selected = input(false);

  readonly resultSelect = output<SearchResult>();
  readonly resultFocus = output<SearchResult>();
  readonly resultUnfocus = output<SearchResult>();
}
