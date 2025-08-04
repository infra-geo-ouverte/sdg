import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading
} from '@angular/router';

import { provideIcon } from '@igo2/common/icon';
import { withUrlDefaultLanguage } from '@igo2/core/language';
import { provideMessage } from '@igo2/core/message';
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
  withIgo2Translation,
  withRouterTitleResolver
} from '@igo2/sdg-core';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { AppTitleResolver } from './config/title-resolver';
import { AppTranslationService } from './config/translation/translation.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideTranslation(
      withIgo2Translation(environment.language!, AppTranslationService),
      withRouterTitleResolver(AppTitleResolver),
      withUrlDefaultLanguage() as any
    ),
    provideMessage(),
    provideNavigationTitle({
      separator: '·',
      suffix: 'Démo SDG'
    }),
    provideIcon(),
    provideTranslatedLabels(SDG_ANCHOR_MENU_LABELS, 'sdg.anchorMenu.title'),
    provideTranslatedLabels(SDG_BLOCK_LINK_LABELS, 'sdg.blockLink.seeMore'),
    provideTranslatedLabels(SDG_SEE_ALSO_LABELS, 'sdg.seeAlso.title'),
    provideTranslatedLabels(SDG_HEADER_LABELS, 'sdg.header.contactUs'),
    provideTranslatedLabels(SDG_SEQUENTIAL_LINKS_LABELS, 'sdg.sequentialLinks')
  ]
};
