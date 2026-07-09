import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

import { IHomeOptions } from '../navigation';
import { GeolocationOptions } from '../navigation/geolocation';

export interface ISdgMap<T = unknown> {
  engine: T;
  readonly options: MapOptions;
  initialExtent: Extent | undefined;

  setInitialExtent(extent?: Extent): void;
  getExtent(): Extent;
  setTarget(id: string | HTMLElement | undefined): void;
  fit(extent: Extent): void;
  updateView(options: IViewBaseOptions): void;
  getMovementTarget(): HasEventTargetAddRemove<unknown>;
  getRotationDegree(): number;
  goTo(options: IAnimationOptions): void;
  getZoom(): number | undefined;
  getMinZoom(): number;
  getMaxZoom(): number;
}

export interface MapOptions {
  view: IViewBaseOptions;
  layers?: unknown[];
  overlay?: boolean;
  interactions?: boolean;
  legend?: boolean;
  navigation?: {
    /** Default to true */
    geolocation?: boolean | GeolocationOptions;
    /** Default to true */
    home?: boolean | IHomeOptions;
    /** Default to true */
    rotation?: boolean;
    /** Default to true */
    zoom?: boolean;
  };
}

export interface MapFooterOptions extends IMapFooterAttribution {
  scaleLine?: boolean;
}

export interface IMapFooterAttribution {
  organization: {
    name: string;
    url: string;
  };
  firstPublicationDate?: string | Date;
}

export type Extent = [number, number, number, number] | number[];

export interface IViewBaseOptions {
  center?: ICoordinates;
  extent?: Extent;
  projection?: string;
  rotation?: number;
  zoom?: number;
  animation?: IAnimationOptions;
}

export interface IAnimationOptions {
  center?: ICoordinates;
  zoom?: number;
  duration?: number;
  rotation?: number;
  easing?: (easing: number) => number;
}

export type ICoordinates = [number, number] | number[];
