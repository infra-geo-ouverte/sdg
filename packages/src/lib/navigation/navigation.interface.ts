import { Route } from '@angular/router';

export type INavigationRoutes = INavigationRoute[];

export interface INavigationRoute extends Route {
  /** Hidden in the primary tabs navigation */
  hidden?: boolean;
}

export interface INavigationConfig {
  options?: INavigationOptions;
}

export interface INavigationOptions {
  title?: INavigationTitleOptions;
}

/**
 * Options for the page title of the HTML Document
 * */
export interface INavigationTitleOptions {
  /** Suffix to the head title */
  suffix: string;
  separator: string;
}
