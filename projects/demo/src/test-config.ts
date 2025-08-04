import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestModuleMetadata } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import {
  SDG_ANCHOR_MENU_LABELS,
  SDG_BLOCK_LINK_LABELS,
  SDG_HEADER_LABELS,
  SDG_SEE_ALSO_LABELS,
  SDG_SEQUENTIAL_LINKS_LABELS
} from '@igo2/sdg-common';
import {
  provideTranslatedLabels,
  provideTranslation,
  withIgo2TranslationMock,
  withRouterTitleResolver
} from '@igo2/sdg-core';

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
    provideAnimations(),
    provideTranslatedLabels(SDG_ANCHOR_MENU_LABELS, 'sdg.anchorMenu.title'),
    provideTranslatedLabels(SDG_BLOCK_LINK_LABELS, 'sdg.blockLink.seeMore'),
    provideTranslatedLabels(SDG_SEE_ALSO_LABELS, 'sdg.seeAlso.title'),
    provideTranslatedLabels(SDG_HEADER_LABELS, 'sdg.header.contactUs'),
    provideTranslatedLabels(SDG_SEQUENTIAL_LINKS_LABELS, 'sdg.sequentialLinks')
  ]
};
