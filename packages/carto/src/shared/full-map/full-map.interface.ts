import { MapFooterOptions, MapOptions } from '../map/map.interface';

export interface SdgFullMapOptions extends MapOptions {
  sidepanel?: {
    /** Number of pixels, default to 380 */
    width: number;
  };
  /** Default to true */
  search?: boolean;
  footer: MapFooterOptions;
}
