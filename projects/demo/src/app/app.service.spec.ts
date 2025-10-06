import { TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../test-config';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({ ...TEST_CONFIG });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
