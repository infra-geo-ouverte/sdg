import { GeolocationOptions } from '@igo2/geo';

export interface IMapConfig {
  useStaticIcon: boolean;
  geolocate: GeolocationOptions;
  showRotationButtonIfNoRotation: boolean;
  hasFooter: boolean;
  hasLegendButton: boolean;
  legendInPanel: boolean;
  searchBar?: {
    showSearchButton?: boolean;
    showSearchBar?: boolean;
  };
  app: any;
}

export type LayerType =
  | 'wms'
  | 'wmts'
  | 'arcgisrest'
  | 'imagearcgisrest'
  | 'tilearcgisrest';
