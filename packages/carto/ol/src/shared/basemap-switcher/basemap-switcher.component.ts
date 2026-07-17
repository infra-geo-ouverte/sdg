import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal
} from '@angular/core';

import { BasemapSwitcherLabels, SdgBasemapSwitcher } from '@igo2/sdg-carto';
import { labelAttribute } from '@igo2/sdg-common';

import BaseLayer from 'ol/layer/Base';

import { SdgOlMap } from '..';
import { SdgOlMiniBasemap } from './mini-basemap.component';

const LABELS_DEFAULT: BasemapSwitcherLabels = {
  tooltip: 'Changer le fond de carte'
};

@Component({
  selector: 'sdg-ol-basemap-switcher',
  templateUrl: './basemap-switcher.component.html',
  styleUrl: './basemap-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SdgBasemapSwitcher, SdgOlMiniBasemap]
})
export class SdgOlBasemapSwitcher {
  readonly map = input.required<SdgOlMap>();
  readonly basemaps = input.required<BaseLayer[]>();
  readonly labels = input<
    BasemapSwitcherLabels,
    BasemapSwitcherLabels | undefined
  >(LABELS_DEFAULT, {
    transform: (value) => labelAttribute(value, LABELS_DEFAULT)
  });

  readonly expanded = signal<boolean>(false);

  /**
   * The basemaps that are not currently active (available to switch to).
   * When collapsed, shows only the first inactive basemap.
   * When expanded, shows all inactive basemaps.
   */
  readonly inactiveBasemaps = computed<BaseLayer[]>(() => {
    const all = this.basemaps();
    const activeIndex = this.activeIndex();
    return all.filter((_, i) => i !== activeIndex);
  });

  readonly displayedBasemaps = computed<BaseLayer[]>(() => {
    const inactive = this.inactiveBasemaps();
    if (this.expanded()) {
      return inactive;
    }
    return inactive.length > 0 ? [inactive[0]] : [];
  });

  readonly activeIndex = signal<number>(0);

  selectBasemap(layer: BaseLayer): void {
    const basemaps = this.basemaps();

    // Find the index of the selected basemap
    const index = basemaps.indexOf(layer);
    if (index === -1) return;

    // Hide all basemaps and show the selected one
    basemaps.forEach((basemap, i) => {
      basemap.setVisible(i === index);
    });

    this.activeIndex.set(index);

    // Collapse after selection
    if (this.expanded()) {
      this.expanded.set(false);
    }
  }

  getTitle(layer: BaseLayer): string {
    return layer.get('title') as string;
  }
}
