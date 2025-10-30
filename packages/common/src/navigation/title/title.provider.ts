import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';

import { INavigationTitleOptions } from '../navigation.interface';
import {
  NavigationTitleStrategy,
  TITLE_OPTIONS
} from './title-strategy.service';

/**
 * Provides a strategy for setting the page title after a router navigation.
 */
export function provideNavigationTitle(
  options?: INavigationTitleOptions
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: TITLE_OPTIONS,
      useValue: options
    },
    {
      provide: TitleStrategy,
      useClass: NavigationTitleStrategy,
      deps: [Title, TITLE_OPTIONS]
    }
  ]);
}
