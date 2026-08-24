import { Observable } from 'rxjs';

import type { SearchSource } from './search-source';

export interface SearchSourceConfig {
  title?: string;
  searchUrl?: string;
  enabled?: boolean;
  order?: number;
  params?: Record<string, string | number | boolean>;
}

export type SearchGeometry =
  | { type: 'Point'; coordinates: [number, number] }
  | { type: 'LineString'; coordinates: [number, number][] }
  | { type: 'Polygon'; coordinates: [number, number][][] }
  | { type: 'MultiPolygon'; coordinates: [number, number][][][] }
  | { type: 'MultiLineString'; coordinates: [number, number][][] };

export interface SearchResult {
  id: string;
  title: string;
  titleHtml?: string;
  subtitleHtml?: string;
  icon?: string;
  geometry?: SearchGeometry;
  extent?: [number, number, number, number];
  properties?: Record<string, unknown>;
  source: SearchSource;
  score?: number;
  hasNextPage?: boolean;
}

export interface SearchResultGroup {
  source: SearchSource;
  results: SearchResult[];
  loading: boolean;
  page?: number;
}

export interface TextSearchOptions {
  params?: Record<string, string | number | boolean>;
  limit?: number;
  page?: number;
  extent?: [number, number, number, number];
}

export interface ReverseSearchOptions {
  distance?: number;
  params?: Record<string, string | number | boolean>;
}

export interface TextSearch {
  search(term: string, options?: TextSearchOptions): Observable<SearchResult[]>;
}

export interface ReverseSearch {
  reverseSearch(
    lonLat: [number, number],
    options?: ReverseSearchOptions
  ): Observable<SearchResult[]>;
}
