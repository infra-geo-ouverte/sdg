import { DOCUMENT } from '@angular/common';
import {
  EnvironmentProviders,
  InjectionToken,
  Provider,
  Type,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer
} from '@angular/core';

import { TitleResolver } from '@igo2/sdg-core';

import {
  Language,
  RootTranslateServiceConfig,
  TRANSLATE_SERVICE_CONFIG,
  TranslateServiceConfig,
  provideTranslateService
} from '@ngx-translate/core';

import {
  TranslateHttpLoaderConfig,
  provideTranslateHttpLoader
} from './translation-loader';
import { TranslationService } from './translation.service';

export interface TranslationFeature<KindT extends TranslationFeatureKind> {
  kind: KindT;
  providers: (Provider | EnvironmentProviders)[];
}

export enum TranslationFeatureKind {
  Translation = 0,
  RouterTitleResolver = 1,
  DefaultLanguage = 2,
  WaitOnLoading = 3
}

export function provideTranslatedLabels(
  token: InjectionToken<unknown>,
  key: string
) {
  return {
    provide: token,
    useFactory: (translationService: TranslationService) =>
      translationService.get(key),
    deps: [TranslationService]
  };
}

export function provideTranslation(
  features: TranslationFeature<TranslationFeatureKind>[],
  config?: RootTranslateServiceConfig & {
    loader: Partial<TranslateHttpLoaderConfig>;
  }
) {
  const providers: (Provider | EnvironmentProviders)[] = [];

  for (const feature of features) {
    providers.push(...feature.providers);
  }

  return makeEnvironmentProviders([
    provideTranslateService({
      ...(config ?? {}),
      loader: getLoader(config?.loader)
    }),
    ...providers
  ]);
}

function getLoader(
  loader: Provider | Partial<TranslateHttpLoaderConfig> | undefined
) {
  return loader && isProvider(loader)
    ? loader
    : provideTranslateHttpLoader({
        prefix: '/locale/',
        suffix: '.json',
        useHttpBackend: true,
        ...(loader ?? {})
      });
}

function isProvider(obj: any): obj is Provider {
  return (obj as any).provide !== undefined;
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
        useClass: resolver
      }
    ]
  };
}

/**
 * Get the first segment of the path (e.g., '/en/alerts' => 'en')
 * @param allowedLanguages default to ['fr', 'en']
 */
export function withLanguageFromUrl(
  fallbackLang?: Language,
  allowedLanguages: Language[] = ['fr', 'en']
): TranslationFeature<TranslationFeatureKind.DefaultLanguage> {
  return {
    kind: TranslationFeatureKind.DefaultLanguage,
    providers: [
      {
        provide: TRANSLATE_SERVICE_CONFIG,
        useFactory: defaultLanguageSegmentFactory(
          allowedLanguages,
          fallbackLang
        )
      }
    ]
  };
}

export function withWaitOnI18nReady(): TranslationFeature<TranslationFeatureKind.WaitOnLoading> {
  return {
    kind: TranslationFeatureKind.WaitOnLoading,
    providers: [
      provideAppInitializer(() => {
        const translationService = inject(TranslationService);
        return translationService.translate.use(translationService.lang());
      })
    ]
  };
}

function defaultLanguageSegmentFactory(
  allowedLanguages: Language[],
  fallbackLang?: Language
): () => TranslateServiceConfig {
  return () => {
    const defaultConfig = {
      extend: true
    } satisfies TranslateServiceConfig;
    const doc = inject(DOCUMENT);
    const url = new URL(doc.location.href);

    const langInSegment = url.pathname.split('/').filter(Boolean)[0];
    if (allowedLanguages.includes(langInSegment)) {
      return {
        ...defaultConfig,
        lang: langInSegment,
        fallbackLang: langInSegment
      };
    }

    return {
      ...defaultConfig,
      lang: fallbackLang,
      fallbackLang: fallbackLang ?? 'fr'
    };
  };
}
