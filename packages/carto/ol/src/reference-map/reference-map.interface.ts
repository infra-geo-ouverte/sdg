import { NavigationLabels } from '@igo2/sdg-carto';

export interface ISdgReferenceMapConfig {
  /** Default duration for the help message. Default to 2000 ms */
  helpMessageDuration?: number;
}

export interface ISdgMapLabels {
  restrictions?: IRestrictionLabels;
  buttons?: NavigationLabels;
}

export interface IRestrictionLabels {
  ctrlScroll: string;
  twoFingers: string;
}
