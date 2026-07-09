import { Provider } from '@angular/core';

import { SearchService } from './search.service';

/**
 * Provides the `SearchService` together with one or more search sources.
 * Must be used instead of providing `SearchService` alone so that the service
 * and its sources share the same injector.
 */
export function provideSearch(...sources: Provider[][]): Provider[] {
  return [SearchService, ...sources.flat()];
}
