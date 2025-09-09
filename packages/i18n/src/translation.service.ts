import { Location } from '@angular/common';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  TranslateService,
  Translation,
  TranslationObject
} from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { Language } from './translation.interface';
import { parseUrlWithLanguage } from './translation.utils';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  lang: WritableSignal<Language> = signal('fr');

  constructor(
    public router: Router,
    public location: Location,
    public translate: TranslateService
  ) {
    this.lang.set(this.translate.getFallbackLang() as Language);
  }

  get currentLoader() {
    return this.translate.currentLoader;
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
