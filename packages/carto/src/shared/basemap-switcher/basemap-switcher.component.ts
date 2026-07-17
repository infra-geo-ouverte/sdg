import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { labelAttribute } from '@igo2/sdg-common';

export interface BasemapSwitcherLabels {
  tooltip: string;
}

const LABELS_DEFAULT: BasemapSwitcherLabels = {
  tooltip: 'Changer le fond de carte'
};

@Component({
  selector: 'sdg-basemap-switcher',
  templateUrl: './basemap-switcher.component.html',
  styleUrl: './basemap-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule]
})
export class SdgBasemapSwitcher {
  readonly basemapCount = input.required<number>();
  readonly labels = input<
    BasemapSwitcherLabels,
    BasemapSwitcherLabels | undefined
  >(LABELS_DEFAULT, {
    transform: (value) => labelAttribute(value, LABELS_DEFAULT)
  });

  readonly expanded = model<boolean>(false);

  get visible(): boolean {
    return this.basemapCount() > 1;
  }

  toggle(): void {
    this.expanded.update((v) => !v);
  }
}
