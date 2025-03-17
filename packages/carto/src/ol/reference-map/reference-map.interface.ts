import { IButtonBaseLabels } from '../../shared';

export interface MapLabels {
  restrictions: IRestrictionLabels;
  buttons: IButtonBaseLabels;
}

export interface IRestrictionLabels {
  ctrlScroll: string;
  twoFingers: string;
}
