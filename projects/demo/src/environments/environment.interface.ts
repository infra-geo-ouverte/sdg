import {
  IFooterConfig,
  IHeaderConfig,
  INavigationOptions
} from '@igo2/sdg-common';

export interface EnvironmentOptions {
  production: boolean;
  title: string;
  description?: string;
  header: IHeaderConfig;
  navigation?: {
    options: INavigationOptions;
  };
  footer: IFooterConfig;
  hasFooter?: boolean;
}
