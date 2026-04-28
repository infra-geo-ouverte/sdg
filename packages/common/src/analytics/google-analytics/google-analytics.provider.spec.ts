import { ApplicationRef, PLATFORM_ID, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { withGoogleAnalytics } from './google-analytics.provider';
import { GoogleAnalyticsService } from './google-analytics.service';

describe('withGoogleAnalytics', () => {
  const mockTargetId = 'GA-123456789';
  let gaService: Pick<
    GoogleAnalyticsService,
    'initialize' | 'trackFirstSSRPageView'
  >;
  let createElementSpy: ReturnType<typeof vi.fn>;
  let appendChildSpy: ReturnType<typeof vi.fn>;

  let dataLayer: any[] = [];
  let gtag: ReturnType<typeof vi.fn>;
  let scriptElementMock: any;

  beforeEach(() => {
    gaService = {
      initialize: vi.fn(),
      trackFirstSSRPageView: vi.fn()
    };

    // Create a simple, mutable mock object.
    scriptElementMock = {
      async: false,
      src: '',
      onload: null
    } as HTMLScriptElement;

    const originalCreateElement = document.createElement.bind(document);
    createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockImplementation((...args: any[]) => {
        const [tagName] = args;
        if (typeof tagName === 'string' && tagName.toLowerCase() === 'script') {
          return scriptElementMock;
        }

        return originalCreateElement(tagName);
      });

    const originalAppendChild = document.head.appendChild.bind(document.head);
    appendChildSpy = vi
      .spyOn(document.head, 'appendChild')
      .mockImplementation((node: Node) => {
        if (node === scriptElementMock) {
          return node;
        }

        return originalAppendChild(node);
      });

    dataLayer = [];
    gtag = vi.fn();
    (window as any).dataLayer = dataLayer;
    (window as any).gtag = gtag; // Configure the TestBed with the provider and its dependencies

    TestBed.configureTestingModule({
      providers: [
        ...(TEST_CONFIG.providers ?? []),
        ...withGoogleAnalytics({ targetId: mockTargetId }).providers,
        { provide: GoogleAnalyticsService, useValue: gaService }
      ]
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete (window as any).dataLayer;
    delete (window as any).gtag;
  });

  it('should not initialize on the server', () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' }); // The provideAppInitializer factory returns a function. We need to call that function to trigger the initialization.

    TestBed.runInInjectionContext(() => {
      expect(createElementSpy).not.toHaveBeenCalledWith('script');
    });
  });

  it('should initialize Google Analytics on the browser', () => {
    TestBed.runInInjectionContext(() => {
      const appRef = inject(ApplicationRef);
      appRef.tick(); // Trigger the initializer
    });

    // Retrieve the script object from the mock call.
    const script = scriptElementMock;

    // Assert that a script tag was created.
    expect(createElementSpy).toHaveBeenCalledWith('script'); // Assert that the properties were correctly mutated by the factory.

    expect(script.async).toBe(true);
    expect(script.src).toContain(
      `https://www.googletagmanager.com/gtag/js?id=${mockTargetId}`
    );
    expect(appendChildSpy).toHaveBeenCalledWith(script);

    // Manually trigger the onload event of the script.
    script.onload!(new Event('load'));

    // Assert that the dataLayer has received the two expected calls.
    // The first call to gtag('js', new Date())
    expect(dataLayer[0][0]).toBe('js');
    expect(dataLayer[0][1]).toEqual(expect.any(Date));

    // The second call to gtag('config', options.targetId, ...)
    expect(dataLayer[1][0]).toBe('config');
    expect(dataLayer[1][1]).toBe(mockTargetId);
    expect(dataLayer[1][2]).toEqual({
      send_page_view: false,
      cookie_flags: 'SameSite=None;Secure'
    });

    // Assert that the GoogleAnalyticsService was initialized.
    expect(gaService.initialize).toHaveBeenCalled();
  });
});
