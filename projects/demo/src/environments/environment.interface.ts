import { EnvironmentOptions as CoreEnvironmentOptions } from '@igo2/core/environment';
import { IHeaderConfig, INavigationConfig } from '@igo2/sdg';

export interface EnvironmentOptions
  extends Pick<CoreEnvironmentOptions, 'monitoring' | 'language'> {
  production: boolean;
  title: string;
  description?: string;
  header: IHeaderConfig;
  navigation?: INavigationConfig;
  hasFooter?: boolean;
}
