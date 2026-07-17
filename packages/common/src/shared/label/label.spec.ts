import { labelAttribute } from './label';

describe('labelAttribute', () => {
  it('should merge value and defaultValue when value is provided', () => {
    const value = { key1: 'value1' };
    const defaultValue = { key2: 'value2' };
    const result = labelAttribute(value, defaultValue);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should return defaultValue when value is null', () => {
    const value = null;
    const defaultValue = { key2: 'value2' };
    const result = labelAttribute(value, defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('should return defaultValue when value is undefined', () => {
    const value = undefined;
    const defaultValue = { key2: 'value2' };
    const result = labelAttribute(value, defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('should return an empty object when both value and defaultValue are not provided', () => {
    const result = labelAttribute(undefined, undefined);
    expect(result).toEqual({});
  });

  it('should handle empty objects for value and defaultValue', () => {
    const value = {};
    const defaultValue = {};
    const result = labelAttribute(value, defaultValue);
    expect(result).toEqual({});
  });

  it('should deep merge nested objects, keeping defaultValue keys not present in value', () => {
    const value = { nested: { key1: 'overridden' } };
    const defaultValue = {
      nested: { key1: 'default', key2: 'kept' },
      top: 'kept'
    };
    const result = labelAttribute(value, defaultValue);
    expect(result).toEqual({
      nested: { key1: 'overridden', key2: 'kept' },
      top: 'kept'
    });
  });

  it('should deep merge multiple levels of nesting', () => {
    const value = { a: { b: { c: 'new' } } };
    const defaultValue = { a: { b: { c: 'old', d: 'kept' }, e: 'kept' } };
    const result = labelAttribute(value, defaultValue);
    expect(result).toEqual({ a: { b: { c: 'new', d: 'kept' }, e: 'kept' } });
  });

  it('should overwrite a nested object with a primitive when value provides one', () => {
    const value = { nested: 'flat' };
    const defaultValue = { nested: { key1: 'default' } };
    const result = labelAttribute(value, defaultValue);
    expect(result).toEqual({ nested: 'flat' });
  });
});
