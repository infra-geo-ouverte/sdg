import { DOCUMENT } from '@angular/common';
import { ApplicationRef, PLATFORM_ID, inject } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { withGoogleAnalytics } from './google-analytics.provider';
import { GoogleAnalyticsService } from './google-analytics.service';

describe('withGoogleAnalytics', () => {
  const mockTargetId = 'GA-123456789';
  let gaService: jasmine.SpyObj<GoogleAnalyticsService>;
  let doc: jasmine.SpyObj<Document>; // Mock the gtag function and window.dataLayer for the test

  let dataLayer: any[] = [];
  let gtag: jasmine.Spy;
  let scriptElementMock: any;

  beforeEach(() => {
    gaService = jasmine.createSpyObj('GoogleAnalyticsService', [
      'initialize',
      'trackFirstPageView'
    ]);
    const headElement = jasmine.createSpyObj('HTMLHeadElement', [
      'appendChild',
      'querySelectorAll'
    ]);

    // Create a simple, mutable mock object.
    scriptElementMock = {
      async: false,
      src: '',
      onload: null
    } as HTMLScriptElement;

    doc = jasmine.createSpyObj('Document', ['createElement'], {
      head: headElement
    });

    doc.createElement.and.returnValue(scriptElementMock);

    dataLayer = [];
    gtag = jasmine.createSpy('gtag');
    (window as any).dataLayer = dataLayer;
    (window as any).gtag = gtag; // Configure the TestBed with the provider and its dependencies

    TestBed.configureTestingModule({
      providers: [
        ...withGoogleAnalytics({ targetId: mockTargetId }).providers,
        { provide: DOCUMENT, useValue: doc },
        { provide: GoogleAnalyticsService, useValue: gaService }
      ]
    });
  });

  it('should not initialize on the server', (done) => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' }); // The provideAppInitializer factory returns a function. We need to call that function to trigger the initialization.

    TestBed.runInInjectionContext(() => {
      expect(doc.createElement).not.toHaveBeenCalled();
      done();
    });
  });

  it('should initialize Google Analytics on the browser', fakeAsync(() => {
    TestBed.runInInjectionContext(() => {
      const appRef = inject(ApplicationRef);
      appRef.tick(); // Trigger the initializer
    });

    tick();

    // Retrieve the script object from the mock call.
    const script = scriptElementMock;

    // Assert that a script tag was created.
    expect(doc.createElement).toHaveBeenCalledWith('script'); // Assert that the properties were correctly mutated by the factory.

    expect(script.async).toBe(true);
    expect(script.src).toContain(
      `https://www.googletagmanager.com/gtag/js?id=${mockTargetId}`
    );
    expect(doc.head.appendChild).toHaveBeenCalledWith(script);

    // Manually trigger the onload event of the script.
    script.onload!(new Event('load'));

    // Assert that the dataLayer has received the two expected calls.
    // The first call to gtag('js', new Date())
    expect(dataLayer[0][0]).toBe('js');
    expect(dataLayer[0][1]).toEqual(jasmine.any(Date));

    // The second call to gtag('config', options.targetId, ...)
    expect(dataLayer[1][0]).toBe('config');
    expect(dataLayer[1][1]).toBe(mockTargetId);
    expect(dataLayer[1][2]).toEqual({ send_page_view: false });

    // Assert that the GoogleAnalyticsService was initialized.
    expect(gaService.initialize).toHaveBeenCalled();
    expect(gaService.trackFirstPageView).toHaveBeenCalled();
  }));
});
