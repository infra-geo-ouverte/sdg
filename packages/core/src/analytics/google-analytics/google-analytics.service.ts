import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription, filter } from 'rxjs';

import { IGoogleAnalyticsOptions } from './google-analytics.interface';
import { GOOGLE_ANALYTICS_OPTIONS } from './google-analytics.provider';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private routerEvents$$?: Subscription;

  constructor(
    @Inject(GOOGLE_ANALYTICS_OPTIONS) private options: IGoogleAnalyticsOptions,
    private router: Router
  ) {}

  initialize(): void {
    if (!gtag) {
      throw new Error('The gtag was not created for Google Analytics');
    }
  }

  trackEvent(eventName: string, eventParams: Record<string, unknown>): void {
    gtag('event', eventName, eventParams);
  }

  trackPageView(): void {
    if (this.routerEvents$$) {
      throw new Error(
        'Page tracking is already instantiated for Google Analytics'
      );
    }

    this.routerEvents$$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag!('config', this.options.targetId, {
          page_path: event.urlAfterRedirects
        });
      });
  }
}
