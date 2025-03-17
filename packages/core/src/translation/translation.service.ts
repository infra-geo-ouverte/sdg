import { WritableSignal } from '@angular/core';

import { Observable } from 'rxjs';

import { Language } from './translation.interface';

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

export abstract class TranslationService {
  abstract lang: WritableSignal<Language>;

  abstract get(
    key: string | string[],
    interpolateParams?: Record<string, unknown>
  ): Translation | TranslationObject;

  abstract getAsync(
    key: string | string[],
    interpolateParams?: Record<string, unknown>
  ): Observable<Translation | TranslationObject>;

  abstract setLanguage(lang: Language): void;
}
