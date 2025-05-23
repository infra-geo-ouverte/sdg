import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading
} from '@angular/router';

import { provideIcon } from '@igo2/common/icon';
import { provideMessage } from '@igo2/core/message';
import { provideNavigationTitle } from '@igo2/sdg-common';
import {
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
      withRouterTitleResolver(AppTitleResolver)
    ),
    provideMessage(),
    provideNavigationTitle({
      separator: '·',
      suffix: 'Démo SDG'
    }),
    provideIcon()
  ]
};
