import { SearchSourceConfig } from './search-source.interface';

const DEFAULT_CONFIG: Required<SearchSourceConfig> = {
  title: '',
  searchUrl: '',
  enabled: true,
  order: 99,
  params: {}
};

export abstract class SearchSource {
  abstract readonly id: string;

  protected readonly config: Required<SearchSourceConfig>;

  constructor(
    defaults: Partial<SearchSourceConfig>,
    overrides?: Partial<SearchSourceConfig>
  ) {
    this.config = { ...DEFAULT_CONFIG, ...defaults, ...overrides };
  }

  get title(): string {
    return this.config.title;
  }

  get enabled(): boolean {
    return this.config.enabled;
  }

  get order(): number {
    return this.config.order;
  }

  get searchUrl(): string {
    return this.config.searchUrl;
  }

  get params(): Record<string, string | number | boolean> {
    return this.config.params;
  }
}
