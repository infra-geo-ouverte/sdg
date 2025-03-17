import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input
} from '@angular/core';

import {
  GeolocateButtonComponent,
  HomeButtonComponent,
  RotationButtonComponent,
  SdgMapBrowserComponent,
  ZoomButtonComponent
} from '../../shared';
import { IOlMapOptions, SdgOlGeolocationController, SdgOlMap } from '../map';
import {
  SDG_REFERENCE_MAP_OPTIONS,
  SdgReferenceMapDefaultOptions
} from './reference-map';
import { SdgReferenceMapInteractionsDirective } from './reference-map-interactions.directive';

@Component({
  selector: 'sdg-ol-reference-map',
  imports: [
    SdgMapBrowserComponent,
    SdgReferenceMapInteractionsDirective,
    ZoomButtonComponent,
    RotationButtonComponent,
    GeolocateButtonComponent,
    HomeButtonComponent
  ],
  templateUrl: './reference-map.component.html',
  styleUrl: './reference-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdgOlReferenceMapComponent implements OnInit {
  readonly options = input.required<IOlMapOptions>();

  defaultOptions = inject<SdgReferenceMapDefaultOptions>(
    SDG_REFERENCE_MAP_OPTIONS,
    {
      optional: true
    }
  );

  map!: SdgOlMap;
  geolocation!: SdgOlGeolocationController;

  constructor() {}

  ngOnInit(): void {
    this.map = new SdgOlMap(this.options());
    this.geolocation = new SdgOlGeolocationController(this.map);
  }
}
