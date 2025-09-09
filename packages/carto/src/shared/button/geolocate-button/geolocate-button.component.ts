import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { labelAttribute } from '@igo2/sdg-i18n';

import { first } from 'rxjs';

import { GeolocationBase } from '../../controller';
import { IGeolocateButtonLabels } from './geolocate-button.interface';

const LABELS_DEFAULT: IGeolocateButtonLabels = {
  active: 'Rechercher ma localisation',
  inactive: 'Masquer ma localisation'
};

@Component({
  selector: 'sdg-geolocate-button',
  templateUrl: './geolocate-button.component.html',
  styleUrls: ['./geolocate-button.component.scss'],
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeolocateButtonComponent {
  controller = input.required<GeolocationBase>();
  color = input<string>();
  labels = input<IGeolocateButtonLabels, IGeolocateButtonLabels | undefined>(
    LABELS_DEFAULT,
    {
      transform: (value) => labelAttribute(value, LABELS_DEFAULT)
    }
  );

  isActive = signal(false);

  toggle(): void {
    this.isActive.update((previous) => !previous);
    this.isActive() ? this.activate() : this.deactivate();
  }

  private activate(): void {
    const controller = this.controller();

    controller.activate();

    controller.position$
      .pipe(first((position) => !!position))
      .subscribe((position) => {
        controller.zoomToPosition(position);
      });
  }

  private deactivate(): void {
    this.controller().deactivate();
  }
}
