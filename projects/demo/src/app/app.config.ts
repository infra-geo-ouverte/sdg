import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection
} from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading
} from '@angular/router';

import {
  SDG_ANCHOR_MENU_LABELS,
  SDG_BLOCK_LINK_LABELS,
  SDG_HEADER_LABELS,
  SDG_SEE_ALSO_LABELS,
  SDG_SEQUENTIAL_LINKS_LABELS,
  provideNavigationTitle
} from '@igo2/sdg-common';
import {
  provideTranslatedLabels,
  provideTranslation,
  withLanguageFromUrl,
  withRouterTitleResolver,
  withWaitOnI18nReady
} from '@igo2/sdg-i18n';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { AppTitleResolver } from './config/title-resolver';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideTranslation(
      [
        withRouterTitleResolver(AppTitleResolver),
        withLanguageFromUrl(),
        withWaitOnI18nReady()
      ],
      {
        loader: {
          // WORKAROUND for the demo on the Github page
          prefix: environment.production ? '/sdg/locale/' : '/locale/'
        }
      }
    ),
    provideNavigationTitle({
      separator: '·',
      suffix: 'Démo SDG'
    }),
    MatIconModule,
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
      return;
    }),
    provideTranslatedLabels(SDG_ANCHOR_MENU_LABELS, 'sdg.anchorMenu'),
    provideTranslatedLabels(SDG_BLOCK_LINK_LABELS, 'sdg.blockLink'),
    provideTranslatedLabels(SDG_SEE_ALSO_LABELS, 'sdg.seeAlso'),
    provideTranslatedLabels(SDG_HEADER_LABELS, 'sdg.header'),
    provideTranslatedLabels(SDG_SEQUENTIAL_LINKS_LABELS, 'sdg.sequentialLinks')
  ]
};
