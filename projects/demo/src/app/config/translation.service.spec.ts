import { TestBed } from '@angular/core/testing';

import { AppTranslationService } from './translation.service';

describe('AppTranslationService', () => {
  let service: AppTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
