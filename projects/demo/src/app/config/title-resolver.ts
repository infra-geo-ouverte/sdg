import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Route } from '@angular/router';

import { RouteTitleKey, TitleResolver } from '@igo2/sdg/core';

import { Observable, tap } from 'rxjs';

import { AppTranslationService } from './translation/translation.service';

@Injectable({ providedIn: 'root' })
export class AppTitleResolver implements TitleResolver<string> {
  constructor(private translationService: AppTranslationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    return this.translationService.translate.get(route.data.title ?? '').pipe(
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

    const value = this.translationService.translate.instant(
      route.data?.title ?? ''
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
