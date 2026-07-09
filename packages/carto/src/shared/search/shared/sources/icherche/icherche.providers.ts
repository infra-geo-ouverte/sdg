import { Provider } from '@angular/core';

import { SEARCH_SOURCES } from '../../search.token';
import type { IChercheConfig } from './icherche.interface';
import { ICHERCHE_CONFIG, IChercheSource } from './icherche.source';

/**
 * Registers the iCherche geocoding source with optional configuration overrides.
 *
 * @example
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     withIChercheSource({ order: 1, params: { limit: '10' } })
 *   ]
 * };
 */
export function withIChercheSource(config?: IChercheConfig): Provider[] {
  return [
    ...(config ? [{ provide: ICHERCHE_CONFIG, useValue: config }] : []),
    { provide: SEARCH_SOURCES, useClass: IChercheSource, multi: true }
  ];
}
