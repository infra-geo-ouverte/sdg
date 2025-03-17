import { Translation, TranslationObject } from '../translation';

export function labelAttribute(
  value: Translation | TranslationObject,
  defaultValue: Translation | TranslationObject = {}
): Translation | TranslationObject {
  return value ? { ...defaultValue, ...value } : defaultValue;
}
