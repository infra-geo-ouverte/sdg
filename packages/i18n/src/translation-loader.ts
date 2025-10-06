import { isPlatformServer } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { DOCUMENT, PLATFORM_ID, inject } from '@angular/core';

import { TranslateLoader } from '@ngx-translate/core';
import {
  TranslateHttpLoaderConfig as NgxTranslateHttpLoaderConfig,
  TRANSLATE_HTTP_LOADER_CONFIG,
  TranslateHttpLoader
} from '@ngx-translate/http-loader';

export type TranslateHttpLoaderConfig = NgxTranslateHttpLoaderConfig;

export function provideTranslateHttpLoader(
  config: Partial<TranslateHttpLoaderConfig> = {}
) {
  return [
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useFactory: provideHttpLoaderFactory(config)
    },
    {
      provide: TranslateLoader,
      useClass: TranslateHttpLoader,
      deps: [HttpBackend, TRANSLATE_HTTP_LOADER_CONFIG]
    }
  ];
}

function provideHttpLoaderFactory(config: Partial<TranslateHttpLoaderConfig>) {
  return () => {
    const document = inject(DOCUMENT);
    const platformId = inject(PLATFORM_ID);
    const baseUrl = isPlatformServer(platformId) ? getServerUrl(document) : '';
    return {
      ...config,
      prefix: `${baseUrl}${config.prefix ?? ''}`
    };
  };
}
function getServerUrl(document: Document) {
  const origin = document.location.origin;
  return origin.endsWith('/') ? origin.slice(0, -1) : origin;
}
