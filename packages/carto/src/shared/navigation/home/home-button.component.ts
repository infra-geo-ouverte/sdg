import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { labelAttribute } from '@igo2/sdg-i18n';

import { ISdgMap } from '../../map/map.interface';
import { HomeLabels, IHomeOptions } from './home-button.interface';

const LABELS_DEFAULT: HomeLabels = {
  goHome: 'Vue cartographique par défaut'
};

/*
Button to center the map to the home extent
*/
@Component({
  selector: 'sdg-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss'],
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeButtonComponent {
  map = input.required<ISdgMap>();
  options = input<IHomeOptions>();
  color = input<string>();
  labels = input<HomeLabels, HomeLabels | undefined>(LABELS_DEFAULT, {
    transform: (value) => labelAttribute(value, LABELS_DEFAULT)
  });

  goHome() {
    const extent = this.options()?.extent ?? this.map().initialExtent;
    if (extent) {
      this.map().fit(extent);
    }
  }
}
