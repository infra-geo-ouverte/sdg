/**
 * Extracts the options object from a `boolean | T` toggle pattern.
 * Returns `undefined` when the value is a boolean, or the object itself otherwise.
 */
export function resolveOptions<T extends object>(
  value: boolean | T | undefined
): T | undefined {
  return typeof value === 'object' ? value : undefined;
}

export function merge(
  target: Record<string, any>,
  source: Record<string, any>,
  ignoreUndefined = false
): any {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source)
      .filter((key) => !ignoreUndefined || source[key] !== undefined)
      .forEach((key) => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = merge(target[key], source[key], ignoreUndefined);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
  }
  return output;
}

function isObject(item: object) {
  return (
    item &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    item !== null &&
    !(item instanceof Date)
  );
}
