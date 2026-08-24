import { InjectionToken } from '@angular/core';

export interface SearchLabels {
  clear?: string;
  noResults?: string;
  results?: string;
  loadMore?: string;
}

export const DEFAULT_SEARCH_LABELS: Required<SearchLabels> = {
  clear: 'Effacer',
  noResults: 'Aucun résultat',
  results: 'Résultats',
  loadMore: 'Afficher plus de résultats'
};

export const SEARCH_LABELS = new InjectionToken<SearchLabels>(
  'SDG_SEARCH_LABELS'
);
