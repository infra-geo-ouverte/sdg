import { TestModuleMetadata } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideMockTranslation } from '@igo2/core/language';

export const TEST_CONFIG: TestModuleMetadata = {
  providers: [provideRouter([]), provideMockTranslation(), provideAnimations()]
};
