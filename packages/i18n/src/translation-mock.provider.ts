import { WritableSignal, signal } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Language } from './translation.interface';
import {
  TranslationFeature,
  TranslationFeatureKind
} from './translation.provider';
import { TranslationService } from './translation.service';

export function withTranslationMock(): TranslationFeature<TranslationFeatureKind.Translation> {
  return {
    kind: TranslationFeatureKind.Translation,
    providers: [
      { provide: TranslationService, useClass: TranslationServiceMock }
    ]
  };
}

export class TranslationServiceMock extends TranslationService {
  override lang: WritableSignal<Language> = signal('fr');

  override get(key: string | string[]): string {
    return Array.isArray(key) ? key[0] : key;
  }

  override getAsync(key: string | string[]): Observable<string> {
    return of(Array.isArray(key) ? key[0] : key);
  }

  override setLanguage() {
    window.location.reload();
  }
}
