import { SdgRoute } from '@igo2/sdg-core';

export type INavigationLinks = INavigationLink[];

export type INavigationLink = Required<Pick<SdgRoute, 'path'>> & {
  title: string;
};

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
