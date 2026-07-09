import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SearchSource } from '../../search-source';
import {
  SearchResult,
  TextSearch,
  TextSearchOptions
} from '../../search-source.interface';
import { ICHERCHE_ICONS } from './icherche-icons';
import {
  IChercheConfig,
  IChercheFeature,
  IChercheResponse
} from './icherche.interface';

export const ICHERCHE_CONFIG = new InjectionToken<IChercheConfig>(
  'SDG_ICHERCHE_CONFIG'
);

const DEFAULT_SEARCH_URL = 'https://icherche.geo.msp.gouv.qc.ca';
const DEFAULT_TYPES = 'adresses,codes-postaux,municipalites,mrc,regadmin,lieux';
const DEFAULT_LIMIT = 5;

@Injectable()
export class IChercheSource extends SearchSource implements TextSearch {
  static readonly id = 'icherche';

  private readonly http = inject(HttpClient);

  readonly id = IChercheSource.id;

  constructor() {
    const config = inject(ICHERCHE_CONFIG, { optional: true }) ?? undefined;
    super(
      {
        title: 'iCherche',
        searchUrl: DEFAULT_SEARCH_URL,
        enabled: true,
        order: 1,
        params: { limit: DEFAULT_LIMIT }
      },
      config
    );
  }

  search(
    term: string,
    options?: TextSearchOptions
  ): Observable<SearchResult[]> {
    const params = this.buildParams(term, options);
    return this.http
      .get<IChercheResponse>(`${this.searchUrl}/geocode`, { params })
      .pipe(
        map((response) => this.extractResults(response)),
        catchError(() => of([]))
      );
  }

  private buildParams(term: string, options?: TextSearchOptions): HttpParams {
    const fromObject: Record<string, string> = {
      q: term,
      geometry: 'true',
      bbox: 'true',
      icon: 'true',
      type: DEFAULT_TYPES,
      limit: String(DEFAULT_LIMIT),
      ...this.stringifyParams(this.params),
      ...this.stringifyParams(options?.params ?? {}),
      ...(options?.limit != null ? { limit: String(options.limit) } : {}),
      ...(options?.page != null ? { page: String(options.page) } : {})
    };

    if (options?.extent) {
      const [xMin, yMin, xMax, yMax] = options.extent;
      fromObject['loc'] =
        `${xMin},${yMin};${xMax},${yMin};${xMax},${yMax};${xMin},${yMax};${xMin},${yMin}`;
    }

    return new HttpParams({ fromObject });
  }

  private stringifyParams(
    params: Record<string, string | number | boolean>
  ): Record<string, string> {
    return Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    );
  }

  private extractResults(response: IChercheResponse): SearchResult[] {
    return response.features.map((feature) => this.featureToResult(feature));
  }

  private featureToResult(feature: IChercheFeature): SearchResult {
    const { nom, type, code, index } = feature.properties;
    const id = [this.id, index ?? type, code].filter(Boolean).join('.');

    const titleHtml = feature.highlight?.title ?? nom;
    const subtitleParts = [
      feature.highlight?.title2,
      feature.highlight?.title3
    ].filter(Boolean);
    const subtitleHtml = subtitleParts.length
      ? subtitleParts.map((p) => `<small>${p}</small>`).join('<br>')
      : undefined;

    return {
      id,
      title: nom,
      titleHtml,
      subtitleHtml,
      icon: feature.icon
        ? (ICHERCHE_ICONS[feature.icon] ?? feature.icon)
        : undefined,
      geometry: feature.geometry as SearchResult['geometry'],
      extent: feature.bbox,
      properties: feature.properties as Record<string, unknown>,
      source: this,
      score: feature.score
    };
  }
}
