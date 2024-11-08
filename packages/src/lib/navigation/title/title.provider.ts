import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';

import { ConfigService } from '@igo2/core/config';
import { LanguageService } from '@igo2/core/language';

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
      useFactory: (configService: ConfigService) =>
        getOptions(configService, options),
      deps: [ConfigService]
    },
    {
      provide: TitleStrategy,
      useClass: NavigationTitleStrategy,
      deps: [Title, LanguageService, TITLE_OPTIONS]
    }
  ]);
}

function getOptions(
  configService: ConfigService,
  options?: INavigationTitleOptions
): INavigationTitleOptions {
  return options != null
    ? options
    : configService.getConfig<INavigationTitleOptions>(
        'navigation.options.title'
      );
}
