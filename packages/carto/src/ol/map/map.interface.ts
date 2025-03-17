import { AnimationOptions, ViewOptions } from 'ol/View';
import Layer from 'ol/layer/Layer';

import { IMapBaseOptions, IViewBaseOptions } from '../../shared';

export interface IOlMapOptions extends IMapBaseOptions {
  layers?: Layer[];
  view: IOlViewOptions;
}

export type IOlViewOptions = IViewBaseOptions &
  ViewOptions & {
    animation?: AnimationOptions;
  };
