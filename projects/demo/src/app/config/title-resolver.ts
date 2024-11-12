import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route } from '@angular/router';

import { LanguageLoader, LanguageService } from '@igo2/core/language';
import { RouteTitleKey, TitleResolver } from '@igo2/sdg/core';

import { Observable, filter, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppTitleResolver implements TitleResolver<string> {
  constructor(private languageService: LanguageService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const loader = this.languageService.translate
      .currentLoader as LanguageLoader;
    return loader.isLoaded$.pipe(
      filter((isLoaded) => isLoaded),
      switchMap(() =>
        this.languageService.translate.get(route.data.title ?? '')
      ),
      tap((value) => {
        if (!route.routeConfig) {
          return;
        }
        if (!route.routeConfig.data) {
          route.routeConfig.data = {};
        }

        route.routeConfig.data[RouteTitleKey] = value;
      })
    );
  }

  resolveStatic(route: Route): string | undefined {
    const value = this.languageService.translate.instant(
      route.data?.title ?? ''
    );

    if (!route) {
      return;
    }
    if (!route.data) {
      route.data = {};
    }

    route.data[RouteTitleKey] = value;
  }
}
