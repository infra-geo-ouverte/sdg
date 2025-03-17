import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { labelAttribute } from '@igo2/sdg/core';

import { ISdgMap } from '../../map.interface';
import { IHomeButtonLabels } from './home-button.interface';

const LABELS_DEFAULT: IHomeButtonLabels = {
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
  color = input<string>();
  labels = input<IHomeButtonLabels, IHomeButtonLabels | undefined>(
    LABELS_DEFAULT,
    {
      transform: (value) => labelAttribute(value, LABELS_DEFAULT)
    }
  );

  isDisabled = signal(false);

  goHome() {
    const initialExtent = this.map().initialExtent;
    if (initialExtent) {
      this.map().fit(initialExtent);
    }
  }
}
