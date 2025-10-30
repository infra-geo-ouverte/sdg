import { Route } from '@angular/router';

export type SdgRoutes = SdgRoute[];

export interface SdgRoute extends Route {
  isHome?: boolean;
  description?: string;
  children?: SdgRoutes;
  /** Hidden in the primary tabs navigation and in the breadcrumbs */
  hidden?: boolean;
}
