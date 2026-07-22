import type { SearchSourceConfig } from '../../search-source.interface';

export type TerrapiConfig = Partial<SearchSourceConfig>;

export interface TerrapiFeatureProperties {
  [key: string]: unknown;
  nom: string;
  type?: string;
  code?: string;
  municipalite?: string;
}

export interface TerrapiFeature {
  type: 'Feature';
  geometry: {
    type: string;
    coordinates: unknown;
  } | null;
  bbox?: [number, number, number, number];
  properties: TerrapiFeatureProperties;
  icon?: string;
}

export interface TerrapiResponse {
  type: 'FeatureCollection';
  features: TerrapiFeature[];
}
