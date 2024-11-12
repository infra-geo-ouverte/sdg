import { WritableSignal } from '@angular/core';

import { Observable } from 'rxjs';

import { Language } from './translation.interface';

export abstract class TranslationService {
  abstract lang: WritableSignal<Language>;

  abstract get(
    key: string | string[],
    interpolateParams?: Record<string, unknown>
  ): Observable<string>;
  abstract setLanguage(lang: Language): void;
}
