import { Injectable, NgZone, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription, filter, first } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private router = inject(Router);
  private ngZone = inject(NgZone);

  private routerEvents$$?: Subscription;

  initialize(): void {
    if (!gtag) {
      throw new Error('The gtag was not created for Google Analytics');
    }
  }

  trackEvent(eventName: string, eventParams: Record<string, unknown>): void {
    gtag('event', eventName, eventParams);
  }

  trackFirstSSRPageView(): void {
    if (this.routerEvents$$) {
      throw new Error(
        'Page tracking is already instantiated for Google Analytics'
      );
    }

    this.routerEvents$$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        first()
      )
      .subscribe((event: NavigationEnd) => {
        // WORKAROUND, the gtag call is blocking the SSR hydratation
        this.ngZone.runOutsideAngular(() => {
          gtag('event', 'page_view', {
            page_path: event.urlAfterRedirects
          });
        });
      });
  }
}
