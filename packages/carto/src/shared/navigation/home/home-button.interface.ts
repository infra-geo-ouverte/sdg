import { Extent } from '../../map/map.interface';

export type IHomeOptions = IHomeButtonOptions;

export interface IHomeButtonOptions {
  extent?: Extent;
}

export interface HomeLabels {
  goHome: string;
}
