import { InjectionToken, Provider } from '@angular/core';

import { TranslationService } from '@igo2/sdg-core';

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
  translationKey?: string;
  /** Default to 2000 ms (2 seconds) */
  helpMessageDuration?: number;
}): MapFeature<MapFeatureKind.Options> {
  const { translationKey, ...restOptions } = options;

  const baseOptions: SdgReferenceMapDefaultOptions = restOptions;

  return {
    kind: MapFeatureKind.Options,
    providers: [
      translationKey
        ? {
            provide: SDG_REFERENCE_MAP_OPTIONS,
            useFactory: (translationService: TranslationService) => {
              return {
                ...baseOptions,
                labels: translationService.get(translationKey!)
              } satisfies SdgReferenceMapDefaultOptions;
            },
            deps: [TranslationService]
          }
        : {
            provide: SDG_REFERENCE_MAP_OPTIONS,
            useValue: baseOptions
          }
    ]
  };
}
