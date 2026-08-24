import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SearchSource } from '../../search-source';
import {
  ReverseSearch,
  ReverseSearchOptions,
  SearchResult
} from '../../search-source.interface';
import { ICHERCHE_ICONS } from '../icherche/icherche-icons';
import {
  TerrapiConfig,
  TerrapiFeature,
  TerrapiResponse
} from './terrapi.interface';

export const TERRAPI_CONFIG = new InjectionToken<TerrapiConfig>(
  'SDG_TERRAPI_CONFIG'
);

const DEFAULT_SEARCH_URL = 'https://terrapi.geo.securite.gouv.qc.ca';
const DEFAULT_TYPES = 'adresses,municipalites,mrc,regadmin';

@Injectable()
export class TerrapiSource extends SearchSource implements ReverseSearch {
  static readonly id = 'terrapi';

  private readonly http = inject(HttpClient);

  readonly id = TerrapiSource.id;

  constructor() {
    const config = inject(TERRAPI_CONFIG, { optional: true }) ?? undefined;
    super(
      {
        title: 'TerraPI',
        searchUrl: DEFAULT_SEARCH_URL,
        enabled: true,
        order: 2,
        params: {}
      },
      config
    );
  }

  reverseSearch(
    lonLat: [number, number],
    options?: ReverseSearchOptions
  ): Observable<SearchResult[]> {
    const params = this.buildParams(lonLat, options);
    return this.http
      .get<TerrapiResponse>(`${this.searchUrl}/locate`, { params })
      .pipe(
        map((response) => this.extractResults(response)),
        catchError(() => of([]))
      );
  }

  private buildParams(
    lonLat: [number, number],
    options?: ReverseSearchOptions
  ): HttpParams {
    const fromObject: Record<string, string> = {
      loc: lonLat.join(','),
      sort: 'distance',
      geometry: 'true',
      icon: 'true',
      type: DEFAULT_TYPES,
      bufferInput: '100',
      ...this.stringifyParams(this.params),
      ...(options?.distance != null
        ? { bufferInput: String(options.distance) }
        : {}),
      ...this.stringifyParams(options?.params ?? {})
    };

    return new HttpParams({ fromObject });
  }

  private stringifyParams(
    params: Record<string, string | number | boolean>
  ): Record<string, string> {
    return Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    );
  }

  private extractResults(response: TerrapiResponse): SearchResult[] {
    return response.features.map((feature) => this.featureToResult(feature));
  }

  private featureToResult(feature: TerrapiFeature): SearchResult {
    const { nom, type, code } = feature.properties;
    const id = [this.id, type, code].filter(Boolean).join('.');

    return {
      id,
      title: nom,
      icon: feature.icon
        ? (ICHERCHE_ICONS[feature.icon] ?? feature.icon)
        : undefined,
      geometry: feature.geometry as SearchResult['geometry'],
      extent: feature.bbox,
      properties: feature.properties as Record<string, unknown>,
      source: this
    };
  }
}
