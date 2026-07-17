import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  GeolocateButtonComponent,
  HomeButtonComponent,
  IHomeOptions,
  PanelService,
  RotationButtonComponent,
  SdgFullMapLabels,
  SdgMapBrowser,
  ZoomButtonComponent,
  resolveOptions
} from '@igo2/sdg-carto';
import { labelAttribute } from '@igo2/sdg-common';

import BaseLayer from 'ol/layer/Base';

import { SdgOlBasemapSwitcher } from '../../shared/basemap-switcher';
import { SdgOlGeolocation, SdgOlMap } from '../../shared/map';
import type { SdgOlFullMapOptions } from '../full-map.component';

type SdgOlFullMapBrowserLabels = Pick<
  SdgFullMapLabels,
  'legend' | 'basemap' | 'navigation'
>;

const LABELS_DEFAULT: SdgOlFullMapBrowserLabels = {
  legend: {
    label: 'Légende',
    open: 'Ouvrir la légende',
    close: 'Fermer la légende'
  }
};

@Component({
  selector: 'sdg-ol-full-map-browser',
  imports: [
    SdgMapBrowser,
    MatTooltipModule,
    MatButtonModule,
    GeolocateButtonComponent,
    RotationButtonComponent,
    ZoomButtonComponent,
    HomeButtonComponent,
    SdgOlBasemapSwitcher
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './full-map-browser.component.html',
  styleUrl: './full-map-browser.component.scss'
})
export class SdgOlFullMapBrowser implements OnInit, AfterViewInit {
  readonly panelService = inject(PanelService);

  readonly options = input.required<SdgOlFullMapOptions>();
  readonly isHandset = input.required<boolean>();
  readonly labels = input<
    SdgOlFullMapBrowserLabels,
    SdgOlFullMapBrowserLabels | undefined
  >(LABELS_DEFAULT, {
    transform: (value) => labelAttribute(value, LABELS_DEFAULT)
  });
  readonly mapReady = output<SdgOlMap>();
  readonly extentChange = output<void>();

  map!: SdgOlMap;
  geolocation!: SdgOlGeolocation;
  basemaps: BaseLayer[] = [];

  readonly homeOptions = computed<IHomeOptions | undefined>(() =>
    resolveOptions(this.options().navigation?.home)
  );

  ngOnInit(): void {
    this.map = new SdgOlMap(this.options());
    this.basemaps = this.map.basemaps;

    this.geolocation = new SdgOlGeolocation(this.map);

    this.mapReady.emit(this.map);
  }

  ngAfterViewInit(): void {
    this.map.setInitialExtent();
  }

  toggleLegend(): void {
    if (this.panelService.type() === 'legend') {
      if (this.panelService.expanded()) {
        const defaultPanel = this.options().panel?.default;
        if (defaultPanel) {
          this.panelService.toggle(defaultPanel);
        } else {
          this.panelService.expanded.set(false);
        }
      } else {
        this.panelService.expanded.set(true);
      }
    } else {
      this.panelService.toggle('legend');
    }
  }
}
