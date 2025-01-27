import { Route } from '@angular/router';

export type SdgRoutes = SdgRoute[];

export interface SdgRoute extends Route {
  isHome?: boolean;
  description?: string;
  /** Hidden in the primary tabs navigation */
  hidden?: boolean;
}
