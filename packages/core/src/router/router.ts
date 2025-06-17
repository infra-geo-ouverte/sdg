import { Route } from '@angular/router';

import { TitleResolver } from './title-resolver/title-resolver';

export const RouteTitleKey = 'RouteTitle';
export const RouteTranslateKey = 'TranslateKey';

function hasStaticTitle(config: Route): boolean {
  return typeof config.title === 'string' || config.title === null;
}

export function resolveTitle(
  config: Route,
  titleResolver?: TitleResolver
): string | undefined {
  if (hasStaticTitle(config)) {
    return config.title as string;
  } else {
    return (
      titleResolver?.resolveStatic(config) ?? config.data?.[RouteTranslateKey] // try to fallback on the translation key
    );
  }
}
