import { TestBed } from '@angular/core/testing';

import { Observable, of, throwError } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { SearchSource } from './search-source';
import {
  ReverseSearch,
  SearchResult,
  TextSearch
} from './search-source.interface';
import { SearchService } from './search.service';
import { SEARCH_SOURCES } from './search.token';

class MockTextSource extends SearchSource implements TextSearch {
  readonly id = 'mock-text';
  constructor() {
    super({ title: 'Mock Text', enabled: true, order: 1 });
  }
  search(term: string): Observable<SearchResult[]> {
    return of([
      {
        id: 'result-1',
        title: `Result for ${term}`,
        source: this
      }
    ]);
  }
}

class MockReverseSource extends SearchSource implements ReverseSearch {
  readonly id = 'mock-reverse';
  constructor() {
    super({ title: 'Mock Reverse', enabled: true, order: 2 });
  }
  reverseSearch(lonLat: [number, number]): Observable<SearchResult[]> {
    return of([
      {
        id: 'reverse-1',
        title: `Reverse at ${lonLat.join(',')}`,
        source: this
      }
    ]);
  }
}

class DisabledSource extends SearchSource implements TextSearch {
  readonly id = 'disabled';
  constructor() {
    super({ title: 'Disabled', enabled: false, order: 3 });
  }
  search(): Observable<SearchResult[]> {
    return of([]);
  }
}

class ErrorSource extends SearchSource implements TextSearch {
  readonly id = 'error-source';
  constructor() {
    super({ title: 'Error', enabled: true, order: 4 });
  }
  search(): Observable<SearchResult[]> {
    return throwError(() => new Error('Network error'));
  }
}

function createService(sources: SearchSource[] = []): SearchService {
  TestBed.configureTestingModule({
    providers: [SearchService, { provide: SEARCH_SOURCES, useValue: sources }]
  });
  return TestBed.inject(SearchService);
}

describe('SearchService', () => {
  describe('textSources', () => {
    it('should return enabled text sources sorted by order', () => {
      const service = createService([
        new DisabledSource(),
        new MockTextSource()
      ]);
      expect(service.textSources).toHaveLength(1);
      expect(service.textSources[0].id).toBe('mock-text');
    });

    it('should return empty array when no sources provided', () => {
      const service = createService([]);
      expect(service.textSources).toHaveLength(0);
    });
  });

  describe('reverseSources', () => {
    it('should return enabled reverse sources sorted by order', () => {
      const service = createService([new MockReverseSource()]);
      expect(service.reverseSources).toHaveLength(1);
      expect(service.reverseSources[0].id).toBe('mock-reverse');
    });
  });

  describe('search', () => {
    it('should return results from text sources', () => {
      const service = createService([new MockTextSource()]);
      let groups: unknown[] = [];
      service.search('hello').subscribe((g) => (groups = g));
      expect(groups).toHaveLength(1);
      expect(groups[0]).toMatchObject({
        source: expect.objectContaining({ id: 'mock-text' }),
        results: [expect.objectContaining({ title: 'Result for hello' })],
        loading: false
      });
    });

    it('should return empty when term is blank', () => {
      const service = createService([new MockTextSource()]);
      let groups: unknown[] | undefined;
      service.search('   ').subscribe((g) => (groups = g));
      expect(groups).toEqual([]);
    });

    it('should return empty when no text sources exist', () => {
      const service = createService([new MockReverseSource()]);
      let groups: unknown[] | undefined;
      service.search('test').subscribe((g) => (groups = g));
      expect(groups).toEqual([]);
    });

    it('should catch errors from a source and return empty results', () => {
      const service = createService([new ErrorSource()]);
      let groups: any[] = [];
      service.search('test').subscribe((g) => (groups = g));
      expect(groups).toHaveLength(1);
      expect(groups[0].results).toEqual([]);
      expect(groups[0].loading).toBe(false);
    });
  });

  describe('reverseSearch', () => {
    it('should return results from reverse sources', () => {
      const service = createService([new MockReverseSource()]);
      let groups: any[] = [];
      service.reverseSearch([-73.5, 45.5]).subscribe((g) => (groups = g));
      expect(groups).toHaveLength(1);
      expect(groups[0]).toMatchObject({
        source: expect.objectContaining({ id: 'mock-reverse' }),
        results: [expect.objectContaining({ title: 'Reverse at -73.5,45.5' })],
        loading: false
      });
    });

    it('should return empty when no reverse sources exist', () => {
      const service = createService([new MockTextSource()]);
      let groups: unknown[] | undefined;
      service.reverseSearch([-73.5, 45.5]).subscribe((g) => (groups = g));
      expect(groups).toEqual([]);
    });
  });

  describe('smartSearch', () => {
    it('should route to text search for non-coordinate terms', () => {
      const service = createService([new MockTextSource()]);
      let groups: any[] = [];
      service.smartSearch('Montreal').subscribe((g) => (groups = g));
      expect(groups).toHaveLength(1);
      expect(groups[0].source.id).toBe('mock-text');
    });

    it('should route to reverse search for coordinate terms', () => {
      const service = createService([new MockReverseSource()]);
      let groups: any[] = [];
      service.smartSearch('45.5, -73.5').subscribe((g) => (groups = g));
      // First group is the coordinates source, second is the reverse source
      expect(groups.length).toBeGreaterThanOrEqual(1);
      expect(groups[0].source.id).toBe('coordinates');
      expect(groups[0].results[0].geometry).toEqual({
        type: 'Point',
        coordinates: expect.any(Array)
      });
    });
  });
});
