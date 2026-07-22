import { GeolocationLabels } from './geolocation';
import { HomeLabels } from './home';
import { RotationLabels } from './rotation';
import { ZoomLabels } from './zoom';

export interface NavigationLabels {
  geolocation?: GeolocationLabels;
  home?: HomeLabels;
  rotation?: RotationLabels;
  zoom?: ZoomLabels;
}
