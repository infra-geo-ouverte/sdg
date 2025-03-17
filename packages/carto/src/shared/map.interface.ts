import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

export interface ISdgMap<T = unknown> {
  engine: T;
  readonly options: IMapBaseOptions;
  initialExtent: Extent | undefined;

  setInitialExtent(): void;
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

export interface IMapBaseOptions {
  view: IViewBaseOptions;
  layers?: unknown[];
  overlay?: boolean;
  interactions?: boolean;
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
