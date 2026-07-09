import type { SearchSourceConfig } from '../../search-source.interface';

export type IChercheConfig = Partial<SearchSourceConfig>;

export interface IChercheHighlight {
  title?: string;
  title2?: string;
  title3?: string;
}

export interface IChercheFeatureProperties {
  [key: string]: unknown;
  nom: string;
  type?: string;
  code?: string;
  index?: string;
  municipalite?: string;
}

export interface IChercheFeature {
  type: 'Feature';
  geometry: {
    type: string;
    coordinates: unknown;
  } | null;
  bbox?: [number, number, number, number];
  properties: IChercheFeatureProperties;
  highlight: IChercheHighlight;
  icon?: string;
  score?: number;
}

export interface IChercheResponse {
  type: 'FeatureCollection';
  features: IChercheFeature[];
}
