import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  model,
  output
} from '@angular/core';

import {
  IHomeOptions,
  SdgGeolocateButton,
  SdgHomeButton,
  SdgMapBrowser,
  SdgRotationButton,
  SdgZoomButton,
  resolveOptions
} from '@igo2/sdg-carto';
import { WithLabels } from '@igo2/sdg-common';

import { SdgOlGeolocation, SdgOlMap, SdgOlMapOptions } from '../shared/map';
import {
  SDG_REFERENCE_MAP_CONFIG,
  SDG_REFERENCE_MAP_LABELS
} from './reference-map';
import { SdgOlReferenceMapInteractions } from './reference-map-interactions.directive';
import {
  ISdgMapLabels,
  ISdgReferenceMapConfig
} from './reference-map.interface';

@Component({
  selector: 'sdg-ol-reference-map',
  imports: [
    SdgGeolocateButton,
    SdgHomeButton,
    SdgMapBrowser,
    SdgOlReferenceMapInteractions,
    SdgRotationButton,
    SdgZoomButton
  ],
  templateUrl: './reference-map.component.html',
  styleUrl: './reference-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdgOlReferenceMap
  extends WithLabels<ISdgMapLabels>
  implements OnInit
{
  readonly options = input.required<SdgOlMapOptions>();
  config = model<ISdgReferenceMapConfig>();
  mapReady = output<SdgOlMap>();

  map!: SdgOlMap;
  geolocation!: SdgOlGeolocation;

  readonly homeOptions = computed<IHomeOptions | undefined>(() =>
    resolveOptions(this.options().navigation?.home)
  );

  constructor() {
    super(undefined, SDG_REFERENCE_MAP_LABELS);

    this.setConfig();
  }

  ngOnInit(): void {
    this.map = new SdgOlMap(this.options());
    this.geolocation = new SdgOlGeolocation(this.map);
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
