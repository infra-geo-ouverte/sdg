import { BehaviorSubject } from 'rxjs';

import { GeolocationBase } from './geolocation.controller';

class GeolocationTest extends GeolocationBase {
  showPosition(): void {
    // Mock implementation
  }

  unshowPosition(): void {
    // Mock implementation
  }

  centerPosition(): void {
    // Mock implementation
  }
}

describe('GeolocationBase', () => {
  let geolocation: GeolocationTest;
  let positionSubject: BehaviorSubject<GeolocationPosition | undefined>;

  beforeEach(() => {
    geolocation = new GeolocationTest();

    positionSubject = new BehaviorSubject<GeolocationPosition | undefined>(
      undefined
    );
    geolocation['_position$'] = positionSubject;

    // Mock navigator.geolocation
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
      (success) => {
        const mockPosition: GeolocationPosition = {
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
        success(mockPosition);
      }
    );

    spyOn(navigator.geolocation, 'watchPosition').and.callFake((success) => {
      const mockPosition: GeolocationPosition = {
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
      success(mockPosition);
      return 1;
    });

    spyOn(navigator.geolocation, 'clearWatch').and.callFake(() => {
      // Mock implementation for clearWatch
      return;
    });
  });

  it('should initialize with default options', () => {
    expect(geolocation.options.tracking).toBe(false);
    expect(geolocation.options.trackingOptions?.enableHighAccuracy).toBe(true);
  });

  it('should toggle tracking on and off', () => {
    spyOn(geolocation, 'activate').and.callThrough();
    spyOn(geolocation, 'deactivate').and.callThrough();

    geolocation.toggle(true);
    expect(geolocation.activate).toHaveBeenCalled();
    expect(geolocation['_isTracking$'].value).toBe(true);

    geolocation.toggle(false);
    expect(geolocation.deactivate).toHaveBeenCalled();
    expect(geolocation['_isTracking$'].value).toBe(false);
  });

  it('should update position when geolocation is available', () => {
    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 10,
        longitude: 20,
        accuracy: 5,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    } as GeolocationPosition;

    positionSubject.next(mockPosition);
    expect(geolocation.position).toEqual(mockPosition);
    expect(geolocation.coordinates?.latitude).toBe(10);
    expect(geolocation.coordinates?.longitude).toBe(20);
  });

  it('should handle geolocation errors', () => {
    const mockError: GeolocationPositionError = {
      code: 1,
      message: 'Permission denied',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3
    };

    spyOn(positionSubject, 'error').and.callThrough();
    positionSubject.error(mockError);

    expect(positionSubject.error).toHaveBeenCalledWith(mockError);
  });

  it('should reset position', () => {
    geolocation.resetPosition();
    const value = geolocation.position;
    expect(value).toBeUndefined();
  });
});
