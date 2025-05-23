import { IButtonBaseLabels } from '@igo2/sdg-carto';

export interface MapLabels {
  restrictions: IRestrictionLabels;
  buttons: IButtonBaseLabels;
}

export interface IRestrictionLabels {
  ctrlScroll: string;
  twoFingers: string;
}
