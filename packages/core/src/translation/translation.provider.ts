import {
  EnvironmentProviders,
  Provider,
  Type,
  makeEnvironmentProviders
} from '@angular/core';

import { LanguageOptions, withStaticConfig } from '@igo2/core/language';
import { provideTranslation as provideIgo2Translation } from '@igo2/core/language';

import { TitleResolver } from '../router';
import { TranslationService } from './translation.service';
import { readQueryParamLanguage } from './translation.utils';

export interface TranslationFeature<KindT extends TranslationFeatureKind> {
  kind: KindT;
  providers: (Provider | EnvironmentProviders)[];
}

export enum TranslationFeatureKind {
  Translation = 0,
  RouterTitleResolver = 1
}

export function provideTranslation(
  ...features: TranslationFeature<TranslationFeatureKind>[]
) {
  const providers: (Provider | EnvironmentProviders)[] = [];

  for (const feature of features) {
    providers.push(...feature.providers);
  }

  return makeEnvironmentProviders(providers);
}

/** Base on the @ngx-translate library with the IgoLanguageModule */
export function withIgo2Translation(
  options: LanguageOptions,
  service: Type<TranslationService>
): TranslationFeature<TranslationFeatureKind.Translation> {
  const paramLanguage = readQueryParamLanguage();
  return {
    kind: TranslationFeatureKind.Translation,
    providers: [
      provideIgo2Translation(withStaticConfig(options, paramLanguage)),
      { provide: TranslationService, useClass: service }
    ]
  };
}

/**
 * Provide a translater for the Route title.
 * Some components is base on the title of the route and
 * this Resolver will allow to automatically resolve the translation
 **/
export function withRouterTitleResolver<T>(
  resolver: Type<TitleResolver<T>>
): TranslationFeature<TranslationFeatureKind.RouterTitleResolver> {
  return {
    kind: TranslationFeatureKind.RouterTitleResolver,
    providers: [
      {
        provide: TitleResolver<T>,
        useClass: resolver,
        deps: [TranslationService]
      }
    ]
  };
}
