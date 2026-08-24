import { describe, expect, it } from 'vitest';

import { SearchSource } from './search-source';

class TestSource extends SearchSource {
  readonly id = 'test-source';
  constructor(
    defaults?: Partial<ConstructorParameters<typeof SearchSource>[0]>,
    overrides?: Partial<ConstructorParameters<typeof SearchSource>[1]>
  ) {
    super(defaults ?? { title: 'Test' }, overrides);
  }
}

describe('SearchSource', () => {
  it('should apply default config values', () => {
    const source = new TestSource();
    expect(source.title).toBe('Test');
    expect(source.enabled).toBe(true);
    expect(source.order).toBe(99);
    expect(source.searchUrl).toBe('');
    expect(source.params).toEqual({});
  });

  it('should allow defaults to override built-in defaults', () => {
    const source = new TestSource({
      title: 'Custom',
      order: 5,
      searchUrl: 'https://example.com',
      enabled: false,
      params: { key: 'value' }
    });
    expect(source.title).toBe('Custom');
    expect(source.order).toBe(5);
    expect(source.searchUrl).toBe('https://example.com');
    expect(source.enabled).toBe(false);
    expect(source.params).toEqual({ key: 'value' });
  });

  it('should allow overrides to take precedence over defaults', () => {
    const source = new TestSource(
      { title: 'Default Title', order: 1 },
      { title: 'Overridden', order: 10 }
    );
    expect(source.title).toBe('Overridden');
    expect(source.order).toBe(10);
  });

  it('should expose the abstract id property', () => {
    const source = new TestSource();
    expect(source.id).toBe('test-source');
  });
});
