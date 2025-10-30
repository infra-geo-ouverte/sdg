import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { labelAttribute } from '@igo2/sdg-i18n';

import { fromEvent } from 'rxjs';

import { ISdgMap } from '../../map.interface';
import type { IRotationButtonLabels } from './rotation-button.interface';

const LABELS_DEFAULT: IRotationButtonLabels = {
  reset: 'Réinitialiser la carte vers le nord'
};

@Component({
  selector: 'sdg-rotation-button',
  templateUrl: './rotation-button.component.html',
  styleUrls: ['./rotation-button.component.scss'],
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotationButtonComponent implements OnInit {
  map = input.required<ISdgMap>();
  color = input<string>();
  labels = input<IRotationButtonLabels, IRotationButtonLabels | undefined>(
    LABELS_DEFAULT,
    {
      transform: (value) => labelAttribute(value, LABELS_DEFAULT)
    }
  );

  /** rotation in degree */
  rotation = signal<number>(0);

  ngOnInit(): void {
    const target = this.map().getMovementTarget();

    fromEvent(target, 'change:rotation').subscribe(() => {
      const degree = Math.round(this.map().getRotationDegree());
      this.rotation.set(degree);
    });
  }

  reset(): void {
    this.map().goTo({ rotation: 0 });
  }
}
