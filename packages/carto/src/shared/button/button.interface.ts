import { IGeolocateButtonLabels } from './geolocate-button/geolocate-button.interface';
import { IHomeButtonLabels } from './home-button/home-button.interface';
import { IRotationButtonLabels } from './rotation-button/rotation-button.interface';
import { IZoomButtonLabels } from './zoom-button/zoom-button.interface';

export interface IButtonBaseLabels {
  geolocation?: IGeolocateButtonLabels;
  home?: IHomeButtonLabels;
  rotation?: IRotationButtonLabels;
  zoom?: IZoomButtonLabels;
}
