import { InjectionToken, Provider, Type } from '@angular/core';

import type { TranslationService } from '@igo2/sdg-i18n';

import { MapLabels } from './reference-map.interface';

export interface SdgReferenceMapDefaultOptions {
  /** Default labels for the map. */
  labels?: MapLabels;
  /** Default duration for the help message. Default to 2000 ms */
  helpMessageDuration?: number;
}

/**
 * Injection token that can be used to configure the
 * default options for all reference map within an app.
 */
export const SDG_REFERENCE_MAP_OPTIONS =
  new InjectionToken<SdgReferenceMapDefaultOptions>(
    'SDG_REFERENCE_MAP_OPTIONS'
  );

export interface MapFeature<KindT extends MapFeatureKind> {
  kind: KindT;
  providers: Provider[];
}

export enum MapFeatureKind {
  Options = 0
}

export function provideMap(
  ...features: MapFeature<MapFeatureKind>[]
): Provider[] {
  const providers: Provider[] = [];

  for (const feature of features) {
    providers.push(...feature.providers);
  }

  return providers;
}

export function withMapOptions(options: {
  /** The translation is dependant on the `TranlationService` of `@igo2/sdg-core`, be sure to implements and inject the service */
  translation?: {
    key: string;
    service: Type<TranslationService>;
  };
  /** Default to 2000 ms (2 seconds) */
  helpMessageDuration?: number;
}): MapFeature<MapFeatureKind.Options> {
  const { translation, ...restOptions } = options;

  const baseOptions: SdgReferenceMapDefaultOptions = restOptions;

  return {
    kind: MapFeatureKind.Options,
    providers: [
      translation
        ? {
            provide: SDG_REFERENCE_MAP_OPTIONS,
            useFactory: (translationService: TranslationService) => {
              return {
                ...baseOptions,
                labels: translationService.get(translation.key!)
              } satisfies SdgReferenceMapDefaultOptions;
            },
            deps: [translation.service]
          }
        : {
            provide: SDG_REFERENCE_MAP_OPTIONS,
            useValue: baseOptions
          }
    ]
  };
}
