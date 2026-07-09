import { Provider } from '@angular/core';

import { SEARCH_SOURCES } from '../../search.token';
import type { TerrapiConfig } from './terrapi.interface';
import { TERRAPI_CONFIG, TerrapiSource } from './terrapi.source';

/**
 * Registers the TerraPI reverse geocoding source with optional configuration overrides.
 *
 * @example
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     withTerrapiSource({ params: { type: 'adresses,municipalites' } })
 *   ]
 * };
 */
export function withTerrapiSource(config?: TerrapiConfig): Provider[] {
  return [
    ...(config ? [{ provide: TERRAPI_CONFIG, useValue: config }] : []),
    { provide: SEARCH_SOURCES, useClass: TerrapiSource, multi: true }
  ];
}
