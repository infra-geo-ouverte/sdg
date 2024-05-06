import { AllEnvironmentOptions } from '@igo2/integration';
import { IHeaderConfig, INavigationConfig } from '@igo2/sdg';

export interface EnvironmentOptions extends AllEnvironmentOptions {
  production: boolean;
  title: string;
  description?: string;
  header: IHeaderConfig;
  navigation?: INavigationConfig;
  hasFooter?: boolean;
  igo: AllEnvironmentOptions;
}
