import { WritableSignal, signal } from '@angular/core';

import { provideMockTranslation } from '@igo2/core/language';

import { Observable, of } from 'rxjs';

import { Language } from './translation.interface';
import {
  TranslationFeature,
  TranslationFeatureKind
} from './translation.provider';
import { TranslationService } from './translation.service';

export function withIgo2TranslationMock(): TranslationFeature<TranslationFeatureKind.Translation> {
  return {
    kind: TranslationFeatureKind.Translation,
    providers: [
      provideMockTranslation(),
      { provide: TranslationService, useClass: TranslationServiceMock }
    ]
  };
}

export class TranslationServiceMock implements TranslationService {
  lang: WritableSignal<Language> = signal('fr');

  get(key: string | string[]): string {
    return Array.isArray(key) ? key[0] : key;
  }

  getAsync(key: string | string[]): Observable<string> {
    return of(Array.isArray(key) ? key[0] : key);
  }

  setLanguage() {
    window.location.reload();
  }
}
