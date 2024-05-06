import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading
} from '@angular/router';

import { provideIcon } from '@igo2/common/icon';
import { provideConfig } from '@igo2/core/config';
import { provideTranslation } from '@igo2/core/language';

import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideConfig({
      default: environment
    }),
    provideTranslation(),
    provideIcon()
  ]
};
