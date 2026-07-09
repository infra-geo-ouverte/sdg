import { InjectionToken } from '@angular/core';

import { SdgFullMapOptions } from '@igo2/sdg-carto';

import { SdgOlMapOptions } from '../shared/map';
import type { ISdgOlFullMapBrowserLabels } from './browser';

export type SdgOlFullMapOptions = SdgOlMapOptions & SdgFullMapOptions;

export interface SdgOlFullMapLabels {
  browser?: ISdgOlFullMapBrowserLabels;
}

export const SDG_OL_FULL_MAP_LABELS = new InjectionToken<SdgOlFullMapLabels>(
  'SDG_OL_FULL_MAP_LABELS'
);
