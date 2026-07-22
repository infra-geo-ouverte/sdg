import { Injectable, inject } from '@angular/core';

import { Observable, catchError, combineLatest, concat, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { parseCoordinate } from './coordinate-parser';
import { SearchSource } from './search-source';
import {
  ReverseSearch,
  ReverseSearchOptions,
  SearchResult,
  SearchResultGroup,
  TextSearch,
  TextSearchOptions
} from './search-source.interface';
import { SEARCH_SOURCES } from './search.token';

/**
 * Sentinel source used to represent a raw-coordinate result.
 * No HTTP call is ever made; results are built inline in SearchService.
 */
class CoordinatesSource extends SearchSource {
  readonly id = 'coordinates' as const;
  constructor() {
    super({ title: 'Coordinates', order: 0 });
  }
}

@Injectable()
export class SearchService {
  private readonly allSources =
    inject(SEARCH_SOURCES, { optional: true }) ?? [];
  private readonly coordinateSource = new CoordinatesSource();

  get textSources(): (SearchSource & TextSearch)[] {
    return this.allSources
      .filter(this.isTextSearch)
      .filter((s) => s.enabled)
      .sort((a, b) => a.order - b.order);
  }

  get reverseSources(): (SearchSource & ReverseSearch)[] {
    return this.allSources
      .filter(this.isReverseSearch)
      .filter((s) => s.enabled)
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Inspects the search term and automatically routes to either
   * `reverseSearch` (when the term looks like a coordinate) or `search`
   * (plain text). Use this as the single entry point from UI consumers.
   */
  smartSearch(
    term: string,
    options?: TextSearchOptions & ReverseSearchOptions
  ): Observable<SearchResultGroup[]> {
    const parsed = parseCoordinate(term);
    if (parsed) {
      const coordGroup: SearchResultGroup = {
        source: this.coordinateSource,
        results: [this.buildCoordinateResult(parsed.lonLat)],
        loading: false
      };
      return this.reverseSearch(parsed.lonLat, options).pipe(
        map((groups) => [coordGroup, ...groups])
      );
    }
    return this.search(term, options);
  }

  search(
    term: string,
    options?: TextSearchOptions
  ): Observable<SearchResultGroup[]> {
    const sources = this.textSources;

    if (!sources.length || !term.trim()) {
      return of([]);
    }

    const sourceGroups$ = sources.map((source) =>
      concat(
        of<SearchResultGroup>({ source, results: [], loading: true }),
        source.search(term, options).pipe(
          map((results) => ({
            source,
            results,
            loading: false
          })),
          catchError(() => of({ source, results: [], loading: false }))
        )
      )
    );

    return combineLatest(sourceGroups$);
  }

  reverseSearch(
    lonLat: [number, number],
    options?: ReverseSearchOptions
  ): Observable<SearchResultGroup[]> {
    const sources = this.reverseSources;

    if (!sources.length) {
      return of([]);
    }

    const sourceGroups$ = sources.map((source) =>
      concat(
        of<SearchResultGroup>({ source, results: [], loading: true }),
        source.reverseSearch(lonLat, options).pipe(
          map((results) => ({
            source,
            results,
            loading: false
          })),
          catchError(() => of({ source, results: [], loading: false }))
        )
      )
    );

    return combineLatest(sourceGroups$);
  }

  private buildCoordinateResult(lonLat: [number, number]): SearchResult {
    const [lon, lat] = lonLat;
    const title = `${lon}, ${lat}`;
    return {
      id: `${lon},${lat}`,
      title,
      icon: 'location_on',
      geometry: { type: 'Point', coordinates: lonLat },
      score: 100,
      source: this.coordinateSource
    };
  }

  private isTextSearch(
    source: SearchSource
  ): source is SearchSource & TextSearch {
    return (
      'search' in source && typeof (source as TextSearch).search === 'function'
    );
  }

  private isReverseSearch(
    source: SearchSource
  ): source is SearchSource & ReverseSearch {
    return (
      'reverseSearch' in source &&
      typeof (source as ReverseSearch).reverseSearch === 'function'
    );
  }
}
