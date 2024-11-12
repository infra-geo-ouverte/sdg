import { TestBed } from '@angular/core/testing';

import { TranslateService } from '@ngx-translate/core';

import { TEST_CONFIG } from '../../../test-config';
import { AppTranslationService } from './translation.service';

describe('AppTranslationService', () => {
  let service: AppTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...TEST_CONFIG.providers!, TranslateService]
    });
    service = TestBed.inject(AppTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
