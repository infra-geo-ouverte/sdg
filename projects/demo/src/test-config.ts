import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestModuleMetadata } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import {
  provideTranslation,
  withIgo2TranslationMock,
  withRouterTitleResolver
} from '@igo2/sdg/core';

import { AppTitleResolver } from './app/config/title-resolver';

export const TEST_CONFIG: TestModuleMetadata = {
  providers: [
    provideRouter([]),
    provideHttpClient(),
    provideHttpClientTesting(),
    provideTranslation(
      withIgo2TranslationMock(),
      withRouterTitleResolver(AppTitleResolver)
    ),
    provideAnimations()
  ]
};
