import { isPlatformServer } from '@angular/common';
import {
  DOCUMENT,
  PLATFORM_ID,
  TransferState,
  inject,
  provideAppInitializer
} from '@angular/core';

import { AnalyticsFeature, AnalyticsFeatureKind } from '../analytics.interface';
import { IGoogleAnalyticsOptions } from './google-analytics.interface';
import { GoogleAnalyticsService } from './google-analytics.service';

export function withGoogleAnalytics(
  options: IGoogleAnalyticsOptions
): AnalyticsFeature<AnalyticsFeatureKind.GoogleAnalytic> {
  if (!options.targetId) {
    throw new Error('Vous devez configurer le targetId pour Google Analytics');
  }

  return {
    kind: AnalyticsFeatureKind.GoogleAnalytic,
    providers: [
      GoogleAnalyticsService,
      provideAppInitializer(() => {
        const platformId = inject(PLATFORM_ID);
        if (isPlatformServer(platformId)) {
          return;
        }

        return googleAnalyticsFactory(options);
      })
    ]
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
declare let gtag: Function;

function googleAnalyticsFactory(options: IGoogleAnalyticsOptions): void {
  const document = inject(DOCUMENT);
  const gaService = inject(GoogleAnalyticsService);
  const transferState = inject(TransferState);

  // Dynamically load the Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${options.targetId}`;
  document.head.appendChild(script);

  script.onload = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _window = window as any;
    _window['dataLayer'] = _window['dataLayer'] || [];
    _window['gtag'] = function () {
      // eslint-disable-next-line prefer-rest-params
      _window['dataLayer'].push(arguments);
    };

    gtag('js', new Date());

    // Disable automatic page view tracking
    gtag('config', options.targetId, {
      send_page_view: false,
      cookie_flags: 'SameSite=None;Secure',
      ...(options.config ?? {})
    });

    gaService.initialize();

    /**
     * Track the first page view but after we fallback on the default TagManager event. You can manage this event in the TagManger admin console.
     * https://support.google.com/tagmanager/answer/7679319?hl=en&ref_topic=7679108&sjid=1071553345249084852-NA
     * Use the empty transfer state to detect Client only rendered pages
     */
    if (!transferState.isEmpty) {
      gaService.trackFirstSSRPageView();
    }
  };
}
