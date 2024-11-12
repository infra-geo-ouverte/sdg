import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestModuleMetadata } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideMockTranslation } from '@igo2/core/language';
import { provideTranslation, withIgo2Translation } from '@igo2/sdg/core';

import { AppTranslationService } from './app/config/translation/translation.service';

export const TEST_CONFIG: TestModuleMetadata = {
  providers: [
    provideRouter([]),
    provideMockTranslation(),
    provideHttpClientTesting(),
    provideTranslation(withIgo2Translation({}, AppTranslationService)),
    provideAnimations()
  ]
};
