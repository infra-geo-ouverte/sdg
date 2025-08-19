import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';

import { GoogleAnalyticsService } from './google-analytics.service';

// The global gtag function is typically added to the window object by the Google Analytics script.
// In tests, we must declare it to avoid TypeScript errors and then spy on it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const gtag: any;

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  const routerEvents = new Subject<unknown>();

  // Use a Jasmine spy to track calls to the global gtag function
  let gtagSpy: jasmine.Spy;

  beforeEach(() => {
    // 1. Manually define the global gtag function on the window object.
    // This function will be a mock that does nothing.
    // The cast to `any` is needed to satisfy TypeScript.
    (window as any).gtag = () => {};

    // Mock the global gtag function before configuring the module
    gtagSpy = spyOn(window as any, 'gtag');

    // Set up the testing module with mock providers
    TestBed.configureTestingModule({
      providers: [
        GoogleAnalyticsService,
        {
          provide: Router,
          useValue: {
            events: routerEvents.asObservable()
          }
        }
      ]
    });
    service = TestBed.inject(GoogleAnalyticsService);
  });

  // Reset the spy after each test
  afterEach(() => {
    gtagSpy.calls.reset();
    (window as any).gtag?.calls.reset();
  });

  describe('initialize', () => {
    it('should throw an error if gtag is not created', () => {
      // Temporarily redefine gtag as undefined for this test
      Object.defineProperty(window, 'gtag', {
        value: undefined,
        writable: true
      });

      expect(() => service.initialize()).toThrowError(
        'The gtag was not created for Google Analytics'
      );

      // Restore the original spy after the test
      Object.defineProperty(window, 'gtag', {
        value: gtagSpy,
        writable: true
      });
    });

    it('should not throw an error if gtag is defined', () => {
      expect(() => service.initialize()).not.toThrowError();
    });
  });

  describe('trackEvent', () => {
    it('should call gtag with "event" and the provided parameters', () => {
      const eventName = 'test_event';
      const eventParams = { category: 'category', label: 'label' };
      service.trackEvent(eventName, eventParams);
      expect(gtagSpy).toHaveBeenCalledWith('event', eventName, eventParams);
    });
  });

  describe('trackFirstPageView', () => {
    it('should throw an error if page tracking is already instantiated', () => {
      service.trackFirstPageView();
      expect(() => service.trackFirstPageView()).toThrowError(
        'Page tracking is already instantiated for Google Analytics'
      );
    });

    it('should call gtag with the page path on the first NavigationEnd', () => {
      // Act
      service.trackFirstPageView();
      const mockEvent = new NavigationEnd(1, '/test-page', '/test-page');
      routerEvents.next(mockEvent);

      // Assert
      expect(gtagSpy).toHaveBeenCalledWith('event', 'page_view', {
        page_path: '/test-page'
      });
    });

    it('should not call gtag after the first navigation', () => {
      // Act
      service.trackFirstPageView();

      // Simulate
      routerEvents.next(new NavigationEnd(1, '/test-page', '/test-page'));

      routerEvents.next(new NavigationEnd(2, '/test-page2', '/test-page2'));

      // Assert
      expect(gtagSpy).toHaveBeenCalledTimes(1);
    });
  });
});
