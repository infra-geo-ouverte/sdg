import { Translation, TranslationObject } from '../translation.interface';

export function labelAttribute(
  value: Translation | TranslationObject | undefined,
  defaultValue: Translation | TranslationObject = {}
): Translation | TranslationObject {
  const resolved = value ?? {};

  if (isTranslationObject(resolved) && isTranslationObject(defaultValue)) {
    return deepMerge(
      defaultValue as TranslationObject,
      resolved as TranslationObject
    );
  }

  return resolved;
}

function isTranslationObject(value: unknown): value is TranslationObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(
  target: TranslationObject,
  source: TranslationObject
): TranslationObject {
  const output: TranslationObject = { ...target };
  for (const key of Object.keys(source)) {
    if (isTranslationObject(source[key]) && isTranslationObject(target[key])) {
      output[key] = deepMerge(
        target[key] as TranslationObject,
        source[key] as TranslationObject
      );
    } else {
      output[key] = source[key];
    }
  }
  return output;
}
