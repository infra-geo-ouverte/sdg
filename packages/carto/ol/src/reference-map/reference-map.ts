import { InjectionToken, Provider } from '@angular/core';

import {
  ISdgMapLabels,
  ISdgReferenceMapConfig
} from './reference-map.interface';

/**
 * Injection token that can be used to configure the
 * default options for all reference map within an app.
 */
export const SDG_REFERENCE_MAP_CONFIG =
  new InjectionToken<ISdgReferenceMapConfig>('SDG_REFERENCE_MAP_CONFIG');

export const SDG_REFERENCE_MAP_LABELS = new InjectionToken<ISdgMapLabels>(
  'SDG_REFERENCE_MAP_LABELS'
);

export function provideReferenceMapConfig(
  config: ISdgReferenceMapConfig
): Provider {
  return {
    provide: SDG_REFERENCE_MAP_CONFIG,
    useValue: config
  };
}
