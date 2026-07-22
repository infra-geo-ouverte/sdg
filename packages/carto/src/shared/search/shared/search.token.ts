import { InjectionToken } from '@angular/core';

import type { SearchSource } from './search-source';

export const SEARCH_SOURCES = new InjectionToken<SearchSource[]>(
  'SDG_SEARCH_SOURCES'
);
