import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestModuleMetadata } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideMockTranslation } from '@igo2/core/language';
import {
  SDG_ANCHOR_MENU_LABELS,
  SDG_BLOCK_LINK_LABELS,
  SDG_HEADER_LABELS,
  SDG_SEE_ALSO_LABELS,
  SDG_SEQUENTIAL_LINKS_LABELS
} from '@igo2/sdg-common';
import { TranslationService, provideTranslatedLabels } from '@igo2/sdg-core';

class MockTranslationService {
  get(key: string) {
    return key;
  }
}

export const TEST_CONFIG: TestModuleMetadata = {
  providers: [
    provideRouter([]),
    provideMockTranslation(),
    provideHttpClient(),
    provideHttpClientTesting(),
    provideAnimations(),
    provideTranslatedLabels(SDG_ANCHOR_MENU_LABELS, 'sdg.anchorMenu'),
    provideTranslatedLabels(SDG_BLOCK_LINK_LABELS, 'sdg.blockLink'),
    provideTranslatedLabels(SDG_SEE_ALSO_LABELS, 'sdg.seeAlso'),
    provideTranslatedLabels(SDG_HEADER_LABELS, 'sdg.header'),
    provideTranslatedLabels(SDG_SEQUENTIAL_LINKS_LABELS, 'sdg.sequentialLinks'),
    { provide: TranslationService, useClass: MockTranslationService }
  ]
};
