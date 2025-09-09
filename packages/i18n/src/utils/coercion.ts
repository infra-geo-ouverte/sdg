import { Translation, TranslationObject } from '../translation.interface';

export function labelAttribute(
  value: Translation | TranslationObject,
  defaultValue: Translation | TranslationObject = {}
): Translation | TranslationObject {
  return value ? { ...defaultValue, ...value } : defaultValue;
}
