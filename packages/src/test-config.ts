import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestModuleMetadata } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideMockTranslation } from '@igo2/core/language';

export const TEST_CONFIG: TestModuleMetadata = {
  providers: [
    provideRouter([]),
    provideMockTranslation(),
    provideHttpClient(),
    provideHttpClientTesting()
  ]
};
