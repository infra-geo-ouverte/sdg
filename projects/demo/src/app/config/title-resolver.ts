import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Route } from '@angular/router';

import {
  RouteTitleKey,
  RouteTranslateKey,
  TitleResolver
} from '@igo2/sdg-core';
import { TranslationService } from '@igo2/sdg-i18n';

import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppTitleResolver implements TitleResolver {
  private translationService = inject(TranslationService);

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    return this.translationService
      .getAsync(route.data[RouteTranslateKey] ?? '')
      .pipe(
        tap((value) => {
          if (!route.routeConfig) {
            return;
          }

          this.setRouteDataTitle(value, route.routeConfig.data);
        })
      );
  }

  resolveStatic(route: Route | null): string | undefined {
    if (!route) {
      return;
    }

    const value = this.translationService.get(
      route.data?.[RouteTranslateKey] ?? ''
    );

    this.setRouteDataTitle(value, route.data);

    return value;
  }

  private setRouteDataTitle(value: string, data: Data | undefined) {
    if (!data) {
      data = {};
    }

    data[RouteTitleKey] = value;
  }
}
