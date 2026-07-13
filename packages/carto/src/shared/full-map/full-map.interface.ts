import { MapFooterOptions, MapOptions } from '../map/map.interface';
import { PanelType } from './shared/panel.service';

export interface SdgFullMapOptions extends MapOptions {
  sidepanel?: {
    /** Number of pixels, default to 380 */
    width?: number;
    /** Panel type to navigate back to when leaving search/legend. If undefined, the panel is simply closed. */
    defaultPanel?: PanelType;
  };
  /** Default to true */
  search?: boolean;
  footer: MapFooterOptions;
}
