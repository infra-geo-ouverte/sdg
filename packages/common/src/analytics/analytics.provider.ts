import {
  EnvironmentProviders,
  Provider,
  makeEnvironmentProviders
} from '@angular/core';

import { AnalyticsFeature, AnalyticsFeatureKind } from './analytics.interface';

export function provideAnalytics(
  ...features: AnalyticsFeature<AnalyticsFeatureKind>[]
) {
  const providers: (Provider | EnvironmentProviders)[] = [];

  for (const feature of features) {
    providers.push(...feature.providers);
  }

  return makeEnvironmentProviders(providers);
}
