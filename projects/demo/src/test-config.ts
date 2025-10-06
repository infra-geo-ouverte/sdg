import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
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
  withRouterTitleResolver
} from '@igo2/sdg-i18n';

import { AppTitleResolver } from './app/config/title-resolver';

export const TEST_CONFIG: TestModuleMetadata = {
  providers: [
    provideRouter([]),
    provideHttpClient(),
    provideHttpClientTesting(),
    provideZonelessChangeDetection(),
    provideTranslation([withRouterTitleResolver(AppTitleResolver)]),
    provideTranslatedLabels(SDG_ANCHOR_MENU_LABELS, 'sdg.anchorMenu'),
    provideTranslatedLabels(SDG_BLOCK_LINK_LABELS, 'sdg.blockLink'),
    provideTranslatedLabels(SDG_SEE_ALSO_LABELS, 'sdg.seeAlso'),
    provideTranslatedLabels(SDG_HEADER_LABELS, 'sdg.header'),
    provideTranslatedLabels(SDG_SEQUENTIAL_LINKS_LABELS, 'sdg.sequentialLinks')
  ]
};
