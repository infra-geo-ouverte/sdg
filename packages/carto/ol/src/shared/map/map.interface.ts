import { IViewBaseOptions, MapOptions } from '@igo2/sdg-carto';

import { AnimationOptions, ViewOptions } from 'ol/View';
import Layer from 'ol/layer/Layer';

export interface SdgOlMapOptions extends MapOptions {
  layers?: Layer[];
  /** Default to the topo basemap */
  basemaps: Layer[];
  view: SdgOlViewOptions;
}

export type SdgOlViewOptions = IViewBaseOptions &
  ViewOptions & {
    animation?: AnimationOptions;
  };
