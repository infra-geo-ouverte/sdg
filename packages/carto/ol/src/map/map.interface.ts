import { IMapBaseOptions, IViewBaseOptions } from '@igo2/sdg-carto';

import { AnimationOptions, ViewOptions } from 'ol/View';
import Layer from 'ol/layer/Layer';

export interface IOlMapOptions extends IMapBaseOptions {
  layers?: Layer[];
  view: IOlViewOptions;
}

export type IOlViewOptions = IViewBaseOptions &
  ViewOptions & {
    animation?: AnimationOptions;
  };
