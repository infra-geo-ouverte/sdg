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
  NavigationLabels,
  PanelService,
  RotationButtonComponent,
  SdgMapBrowser,
  ZoomButtonComponent,
  resolveOptions
} from '@igo2/sdg-carto';
import { labelAttribute } from '@igo2/sdg-i18n';

import Layer from 'ol/layer/Layer';

import { SdgOlBasemapSwitcher } from '../../shared/basemap-switcher';
import { SdgOlGeolocation, SdgOlMap } from '../../shared/map';
import { SdgOlFullMapOptions } from '../full-map';

// import ScaleLine from 'ol/control/ScaleLine';

const LABELS_DEFAULT: ISdgOlFullMapBrowserLabels = {
  legend: {
    label: 'Légende',
    open: 'Ouvrir la légende',
    close: 'Fermer la légende'
  }
};

export interface ISdgOlFullMapBrowserLabels extends NavigationLabels {
  legend?: {
    label: string;
    open?: string;
    close?: string;
  };
}

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
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './full-map-browser.component.html',
  styleUrl: './full-map-browser.component.scss'
})
export class SdgOlFullMapBrowser implements OnInit, AfterViewInit {
  readonly panelService = inject(PanelService);

  readonly options = input.required<SdgOlFullMapOptions>();
  readonly isHandset = input.required<boolean>();
  readonly labels = input<
    ISdgOlFullMapBrowserLabels,
    ISdgOlFullMapBrowserLabels | undefined
  >(LABELS_DEFAULT, {
    transform: (value) => labelAttribute(value, LABELS_DEFAULT)
  });
  readonly mapReady = output<SdgOlMap>();
  readonly extentChange = output<void>();

  map!: SdgOlMap;
  geolocation!: SdgOlGeolocation;

  readonly basemaps = computed<Layer[]>(() => this.options().basemaps ?? []);
  readonly homeOptions = computed<IHomeOptions | undefined>(() =>
    resolveOptions(this.options().navigation?.home)
  );

  ngOnInit(): void {
    this.map = new SdgOlMap(this.options());

    this.geolocation = new SdgOlGeolocation(this.map);

    this.mapReady.emit(this.map);
  }

  ngAfterViewInit(): void {
    this.map.setInitialExtent();
  }

  toggleLegend(): void {
    if (this.panelService.type() === 'legend') {
      this.panelService.expanded()
        ? this.panelService.toggle('custom')
        : this.panelService.expanded.set(true);
    } else {
      this.panelService.toggle('legend');
    }
  }
}
