import { EnvironmentProviders, Provider } from '@angular/core';

export interface AnalyticsFeature<KindT extends AnalyticsFeatureKind> {
  kind: KindT;
  providers: (Provider | EnvironmentProviders)[];
}

export enum AnalyticsFeatureKind {
  GoogleAnalytic = 0
}
