import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { describe, expect, it } from 'vitest';

import { TerrapiResponse } from './terrapi.interface';
import { TERRAPI_CONFIG, TerrapiSource } from './terrapi.source';

function createSource(config?: object): {
  source: TerrapiSource;
  httpTesting: HttpTestingController;
} {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      TerrapiSource,
      ...(config ? [{ provide: TERRAPI_CONFIG, useValue: config }] : [])
    ]
  });
  return {
    source: TestBed.inject(TerrapiSource),
    httpTesting: TestBed.inject(HttpTestingController)
  };
}

describe('TerrapiSource', () => {
  it('should have id "terrapi"', () => {
    const { source } = createSource();
    expect(source.id).toBe('terrapi');
  });

  it('should have default title "TerraPI"', () => {
    const { source } = createSource();
    expect(source.title).toBe('TerraPI');
  });

  it('should use default search URL', () => {
    const { source } = createSource();
    expect(source.searchUrl).toBe('https://terrapi.geo.msp.gouv.qc.ca');
  });

  it('should allow config override', () => {
    const { source } = createSource({ title: 'Custom Terrapi', order: 10 });
    expect(source.title).toBe('Custom Terrapi');
    expect(source.order).toBe(10);
  });

  describe('reverseSearch', () => {
    it('should call locate endpoint with correct params', () => {
      const { source, httpTesting } = createSource();
      source.reverseSearch([-73.5, 45.5]).subscribe();

      const req = httpTesting.expectOne(
        (r) =>
          r.url === 'https://terrapi.geo.msp.gouv.qc.ca/locate' &&
          r.params.get('loc') === '-73.5,45.5'
      );
      expect(req.request.params.get('geometry')).toBe('true');
      expect(req.request.params.get('sort')).toBe('distance');
      req.flush({ type: 'FeatureCollection', features: [] });
    });

    it('should map features to SearchResult[]', () => {
      const { source, httpTesting } = createSource();
      let results: any[] = [];
      source.reverseSearch([-73.5, 45.5]).subscribe((r) => (results = r));

      const response: TerrapiResponse = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-73.5, 45.5] },
            bbox: [-73.6, 45.4, -73.4, 45.6],
            properties: {
              nom: 'Montréal',
              type: 'municipalites',
              code: '66023'
            },
            icon: 'city'
          }
        ]
      };
      httpTesting.expectOne((r) => r.url.includes('/locate')).flush(response);

      expect(results).toHaveLength(1);
      expect(results[0]).toMatchObject({
        id: 'terrapi.municipalites.66023',
        title: 'Montréal',
        icon: 'location_city',
        geometry: { type: 'Point', coordinates: [-73.5, 45.5] },
        extent: [-73.6, 45.4, -73.4, 45.6]
      });
    });

    it('should pass distance option as bufferInput', () => {
      const { source, httpTesting } = createSource();
      source.reverseSearch([-73.5, 45.5], { distance: 500 }).subscribe();

      const req = httpTesting.expectOne((r) => r.url.includes('/locate'));
      expect(req.request.params.get('bufferInput')).toBe('500');
      req.flush({ type: 'FeatureCollection', features: [] });
    });

    it('should return empty array on HTTP error', () => {
      const { source, httpTesting } = createSource();
      let results: any[] | undefined;
      source.reverseSearch([-73.5, 45.5]).subscribe((r) => (results = r));

      httpTesting
        .expectOne((r) => r.url.includes('/locate'))
        .error(new ProgressEvent('error'));

      expect(results).toEqual([]);
    });
  });
});
