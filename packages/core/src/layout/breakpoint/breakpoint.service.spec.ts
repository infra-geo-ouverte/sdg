import { TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../common/test-config';
import { BreakpointService } from './breakpoint.service';

describe('BreakpointService', () => {
  let service: BreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...TEST_CONFIG.providers!]
    });
    service = TestBed.inject(BreakpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
