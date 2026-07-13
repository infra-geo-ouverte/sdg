import { TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../test-config';
import { PanelService } from './panel.service';

describe('PanelService', () => {
  let service: PanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: TEST_CONFIG.providers
    });
    service = TestBed.inject(PanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default type as "search"', () => {
    expect(service.type()).toBe('search');
  });

  it('should have expanded as false by default', () => {
    expect(service.expanded()).toBe(false);
  });

  describe('toggle', () => {
    it('should toggle expanded state when called without type', () => {
      expect(service.expanded()).toBe(false);

      service.toggle();
      expect(service.expanded()).toBe(true);

      service.toggle();
      expect(service.expanded()).toBe(false);
    });

    it('should set type and expand when called with a different type', () => {
      service.type.set('legend');
      service.expanded.set(false);

      service.toggle('search');

      expect(service.type()).toBe('search');
      expect(service.expanded()).toBe(true);
    });

    it('should toggle expanded when called with the same type', () => {
      service.type.set('search');
      service.expanded.set(true);

      service.toggle('search');

      expect(service.type()).toBe('search');
      expect(service.expanded()).toBe(false);
    });
  });
});
