import { Route } from '@angular/router';

import { TitleResolver } from './title-resolver';

export const RouteTitleKey = 'RouteTitle';

export function hasStaticTitle(config: Route): boolean {
  return typeof config.title === 'string' || config.title === null;
}

export function getRouteTitle(
  config: Route,
  titleResolver?: TitleResolver<string>
): string | undefined {
  if (hasStaticTitle(config)) {
    return config.title as string;
  } else {
    if (config.data?.[RouteTitleKey]) {
      return config.data[RouteTitleKey];
    }

    return titleResolver?.resolveStatic(config);
  }
}
