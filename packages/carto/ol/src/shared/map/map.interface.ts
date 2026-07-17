import { IViewBaseOptions, MapOptions } from '@igo2/sdg-carto';

import { AnimationOptions, ViewOptions } from 'ol/View';
import BaseLayer from 'ol/layer/Base';
import Layer from 'ol/layer/Layer';

import { BasemapId } from '../layer/basemap';

export interface SdgOlMapOptions extends MapOptions {
  layers?: Layer[];
  /**
   * Basemap layers displayed beneath all other layers.
   * Each entry may be either a {@link BasemapId} string key
   * (`'topo'` | `'imagery'` | `'hybrid'`) or a plain OL {@link BaseLayer}.
   * Defaults to the built-in topo basemap when omitted.
   */
  basemaps: (BasemapId | BaseLayer)[];
  view: SdgOlViewOptions;
}

export type SdgOlViewOptions = IViewBaseOptions &
  ViewOptions & {
    animation?: AnimationOptions;
  };
