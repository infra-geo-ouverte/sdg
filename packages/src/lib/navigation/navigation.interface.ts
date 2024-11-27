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
