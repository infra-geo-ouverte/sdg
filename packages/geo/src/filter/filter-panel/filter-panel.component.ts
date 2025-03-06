import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { IgoLanguageModule } from '@igo2/core/language';
import {
  FilterableDataSourcePipe,
  IgoMap,
  OgcFilterableItemComponent
} from '@igo2/geo';

@Component({
  selector: 'sdg-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    MatTooltip,
    MatIconButton,
    MatIcon,
    IgoLanguageModule,
    FilterableDataSourcePipe,
    OgcFilterableItemComponent
  ]
})
export class FilterPanelComponent {
  map = input.required<IgoMap>();
  closed = output<boolean>();

  close() {
    this.closed.emit(true);
  }
}
