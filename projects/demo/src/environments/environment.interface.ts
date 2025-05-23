import { EnvironmentOptions as CoreEnvironmentOptions } from '@igo2/core/environment';
import {
  IFooterConfig,
  IHeaderConfig,
  INavigationOptions
} from '@igo2/sdg-common';

export interface EnvironmentOptions
  extends Pick<CoreEnvironmentOptions, 'monitoring' | 'language'> {
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
