import { NgSwitchCase } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { IgoMap } from '@igo2/geo';
import { QueryState, SearchState } from '@igo2/integration';

import { FilterPanelComponent } from '../../../filter';
import { LegendPanelComponent } from '../../../legend';
import { QueryResultsPanelComponent } from '../../../query';
import { SearchResultPanelComponent } from '../../../search';
import { PanelType } from '../shared/map-screen.interface';

@Component({
  selector: 'sdg-map-screen-panel',
  standalone: true,
  imports: [
    NgSwitchCase,
    SearchResultPanelComponent,
    LegendPanelComponent,
    QueryResultsPanelComponent,
    FilterPanelComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-screen-panel.component.html',
  styleUrl: './map-screen-panel.component.scss'
})
export class MapScreenPanelComponent {
  type = input.required<PanelType>();
  map = input.required<IgoMap>();
  queryState = input.required<QueryState>();
  searchState = input.required<SearchState>();

  closed = output<boolean>();

  onClose(): void {
    this.closed.emit(true);
  }
}
