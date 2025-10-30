import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  model,
  output
} from '@angular/core';

import {
  GeolocateButtonComponent,
  HomeButtonComponent,
  RotationButtonComponent,
  SdgMapBrowserComponent,
  ZoomButtonComponent
} from '@igo2/sdg-carto';
import { WithLabels } from '@igo2/sdg-core';

import { IOlMapOptions, SdgOlGeolocationController, SdgOlMap } from '../map';
import {
  SDG_REFERENCE_MAP_CONFIG,
  SDG_REFERENCE_MAP_LABELS
} from './reference-map';
import { SdgReferenceMapInteractionsDirective } from './reference-map-interactions.directive';
import {
  ISdgMapLabels,
  ISdgReferenceMapConfig
} from './reference-map.interface';

@Component({
  selector: 'sdg-reference-map-ol',
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
export class SdgReferenceMapOlComponent
  extends WithLabels<ISdgMapLabels>
  implements OnInit
{
  readonly options = input.required<IOlMapOptions>();
  config = model<ISdgReferenceMapConfig>();
  mapReady = output<SdgOlMap>();

  map!: SdgOlMap;
  geolocation!: SdgOlGeolocationController;

  constructor() {
    super(undefined, SDG_REFERENCE_MAP_LABELS);

    this.setConfig();
  }

  ngOnInit(): void {
    this.map = new SdgOlMap(this.options());
    this.geolocation = new SdgOlGeolocationController(this.map);
    this.mapReady.emit(this.map);
  }

  private setConfig() {
    const configOverride = inject(SDG_REFERENCE_MAP_CONFIG, {
      optional: true
    });
    if (configOverride) {
      this.config.update((value) => ({ ...value, ...configOverride }));
    }
  }
}
