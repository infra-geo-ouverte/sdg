import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { describe, expect, it } from 'vitest';

import { IChercheResponse } from './icherche.interface';
import { ICHERCHE_CONFIG, IChercheSource } from './icherche.source';

function createSource(config?: object): {
  source: IChercheSource;
  httpTesting: HttpTestingController;
} {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      IChercheSource,
      ...(config ? [{ provide: ICHERCHE_CONFIG, useValue: config }] : [])
    ]
  });
  return {
    source: TestBed.inject(IChercheSource),
    httpTesting: TestBed.inject(HttpTestingController)
  };
}

describe('IChercheSource', () => {
  it('should have id "icherche"', () => {
    const { source } = createSource();
    expect(source.id).toBe('icherche');
  });

  it('should have default title "iCherche"', () => {
    const { source } = createSource();
    expect(source.title).toBe('iCherche');
  });

  it('should use default search URL', () => {
    const { source } = createSource();
    expect(source.searchUrl).toBe('https://icherche.geo.msp.gouv.qc.ca');
  });

  it('should allow config override', () => {
    const { source } = createSource({ title: 'Custom', order: 5 });
    expect(source.title).toBe('Custom');
    expect(source.order).toBe(5);
  });

  describe('search', () => {
    it('should call geocode endpoint with correct params', () => {
      const { source, httpTesting } = createSource();
      source.search('Montreal').subscribe();

      const req = httpTesting.expectOne(
        (r) =>
          r.url === 'https://icherche.geo.msp.gouv.qc.ca/geocode' &&
          r.params.get('q') === 'Montreal'
      );
      expect(req.request.params.get('geometry')).toBe('true');
      expect(req.request.params.get('bbox')).toBe('true');
      req.flush({ type: 'FeatureCollection', features: [] });
    });

    it('should map features to SearchResult[]', () => {
      const { source, httpTesting } = createSource();
      let results: any[] = [];
      source.search('Quebec').subscribe((r) => (results = r));

      const response: IChercheResponse = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-71.2, 46.8] },
            bbox: [-71.3, 46.7, -71.1, 46.9],
            properties: {
              nom: 'Québec',
              type: 'municipalites',
              code: '23027'
            },
            highlight: { title: '<b>Québec</b>' },
            icon: 'city',
            score: 95
          }
        ]
      };
      httpTesting.expectOne((r) => r.url.includes('/geocode')).flush(response);

      expect(results).toHaveLength(1);
      expect(results[0]).toMatchObject({
        id: 'icherche.municipalites.23027',
        title: 'Québec',
        titleHtml: '<b>Québec</b>',
        icon: 'location_city',
        score: 95,
        geometry: { type: 'Point', coordinates: [-71.2, 46.8] },
        extent: [-71.3, 46.7, -71.1, 46.9]
      });
    });

    it('should pass limit and page options', () => {
      const { source, httpTesting } = createSource();
      source.search('test', { limit: 10, page: 2 }).subscribe();

      const req = httpTesting.expectOne((r) => r.url.includes('/geocode'));
      expect(req.request.params.get('limit')).toBe('10');
      expect(req.request.params.get('page')).toBe('2');
      req.flush({ type: 'FeatureCollection', features: [] });
    });

    it('should pass extent as loc parameter', () => {
      const { source, httpTesting } = createSource();
      source.search('test', { extent: [-74, 45, -73, 46] }).subscribe();

      const req = httpTesting.expectOne((r) => r.url.includes('/geocode'));
      expect(req.request.params.get('loc')).toContain('-74');
      req.flush({ type: 'FeatureCollection', features: [] });
    });

    it('should return empty array on HTTP error', () => {
      const { source, httpTesting } = createSource();
      let results: any[] | undefined;
      source.search('fail').subscribe((r) => (results = r));

      httpTesting
        .expectOne((r) => r.url.includes('/geocode'))
        .error(new ProgressEvent('error'));

      expect(results).toEqual([]);
    });
  });
});
