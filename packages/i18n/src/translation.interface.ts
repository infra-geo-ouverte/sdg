export type Language = 'fr' | 'en';

export type Translation =
  | string
  | Translation[]
  | TranslationObject

  // required to prevent error "Type instantiation is excessively deep and possibly infinite."
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any;

// using Record<> does not work because TS does not support recursive definitions
export interface TranslationObject {
  [key: string]: Translation;
}
