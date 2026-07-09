import { TestBed } from '@angular/core/testing';

import { Subscription } from 'rxjs';

import { SdgOlMap } from '../map/map';
import { SdgOlGeolocation } from './geolocation';

const MOCK_POSITION: GeolocationPosition = {
  coords: {
    latitude: 10,
    longitude: 20,
    accuracy: 5,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  } as GeolocationCoordinates,
  timestamp: Date.now()
} as GeolocationPosition;

describe('SdgOlGeolocation', () => {
  let controller: SdgOlGeolocation;
  let mockMap: SdgOlMap;

  beforeEach(() => {
    mockMap = {
      fit: vi.fn(),
      engine: {
        removeLayer: vi.fn()
      }
    } as unknown as SdgOlMap;
    TestBed.configureTestingModule({});
    controller = new SdgOlGeolocation(mockMap);
  });

  it('should create the controller', () => {
    expect(controller).toBeTruthy();
  });

  it('should center the map on the given position', () => {
    controller.zoomToPosition(MOCK_POSITION);

    expect(mockMap.fit).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should remove the position from the map', () => {
    const unsubscribeSpy = vi.fn();
    controller['subscriptions$$'] = { unsubscribe: unsubscribeSpy } as any;

    const mockSource = { clear: vi.fn() };
    controller['layer'] = {
      getSource: vi.fn().mockReturnValue(mockSource)
    } as any;

    controller.unshowPosition();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(mockSource.clear).toHaveBeenCalled();
    expect(mockMap.engine.removeLayer).toHaveBeenCalled();
    expect(controller['layer']).toBeUndefined();
  });

  it('should show the position on the map', () => {
    const mockSource = {
      clear: vi.fn(),
      addFeature: vi.fn()
    };
    const mockLayer = {
      getSource: vi.fn().mockReturnValue(mockSource),
      setMap: vi.fn()
    };

    vi.spyOn(controller['position$'], 'subscribe').mockImplementation(((
      next?: ((position: GeolocationPosition | undefined) => void) | null
    ) => {
      next?.(MOCK_POSITION);
      return {
        unsubscribe: vi.fn(),
        closed: false,
        add: vi.fn(),
        remove: vi.fn()
      } as unknown as Subscription;
    }) as any);

    vi.spyOn(controller as any, 'createLayer').mockReturnValue(mockLayer);

    controller.showPosition();

    expect(controller['layer']).toBeDefined();
  });
});
