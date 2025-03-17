import { Location } from '@angular/common';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from '@igo2/core/language';
import {
  Language,
  Translation,
  TranslationObject,
  parseUrlWithLanguage
} from '@igo2/sdg/core';
import { TranslationService } from '@igo2/sdg/core';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppTranslationService
  extends LanguageService
  implements TranslationService
{
  lang: WritableSignal<Language> = signal('fr');

  constructor(
    private router: Router,
    private location: Location,
    translateService: TranslateService
  ) {
    super(translateService);

    this.lang.set(this.translate.defaultLang as Language);
  }

  get(
    key: string | string[],
    interpolateParams?: Record<string, unknown>
  ): Translation | TranslationObject {
    return this.translate.instant(key, interpolateParams);
  }

  getAsync(
    key: string | string[],
    interpolateParams?: Record<string, unknown>
  ): Observable<Translation | TranslationObject> {
    return this.translate.get(key, interpolateParams);
  }

  setLanguage(lang: string) {
    const [url, params] = parseUrlWithLanguage(this.router.url, lang);
    this.location.go(url, params);
    window.location.reload();
  }
}
