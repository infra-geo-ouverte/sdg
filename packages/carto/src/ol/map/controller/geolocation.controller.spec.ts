import { TestBed } from '@angular/core/testing';

import { Subscription } from 'rxjs';

import { SdgOlMap } from '../map';
import { SdgOlGeolocationController } from './geolocation.controller';

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

describe('SdgOlGeolocationController', () => {
  let controller: SdgOlGeolocationController;
  let mockMap: jasmine.SpyObj<SdgOlMap>;

  beforeEach(() => {
    mockMap = jasmine.createSpyObj('SdgOlMap', ['fit'], {
      engine: jasmine.createSpyObj('engine', ['removeLayer'])
    });
    TestBed.configureTestingModule({});
    controller = new SdgOlGeolocationController(mockMap);
  });

  it('should create the controller', () => {
    expect(controller).toBeTruthy();
  });

  it('should center the map on the given position', () => {
    controller.zoomToPosition(MOCK_POSITION);

    expect(mockMap.fit).toHaveBeenCalledWith(jasmine.any(Array));
  });

  it('should remove the position from the map', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    controller['subscriptions$$'] = { unsubscribe: unsubscribeSpy } as any;

    const mockSource = jasmine.createSpyObj('VectorSource', ['clear']);
    controller['layer'] = jasmine.createSpyObj('VectorLayer', ['getSource']);
    (controller['layer']!.getSource as jasmine.Spy).and.returnValue(mockSource);

    controller.unshowPosition();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(mockSource.clear).toHaveBeenCalled();
    expect(mockMap.engine.removeLayer).toHaveBeenCalled();
    expect(controller['layer']).toBeUndefined();
  });

  it('should show the position on the map', () => {
    const mockSource = jasmine.createSpyObj('VectorSource', [
      'clear',
      'addFeature'
    ]);
    const mockLayer = jasmine.createSpyObj('VectorLayer', [
      'getSource',
      'setMap'
    ]);
    mockLayer.getSource.and.returnValue(mockSource);

    spyOn(controller['position$'], 'subscribe').and.callFake(
      (callback: (position: GeolocationPosition | undefined) => void) => {
        callback(MOCK_POSITION);
        return {
          unsubscribe: jasmine.createSpy('unsubscribe'),
          closed: false,
          add: jasmine.createSpy('add'),
          remove: jasmine.createSpy('remove')
        } as unknown as Subscription;
      }
    );

    spyOn(controller as any, 'createLayer').and.returnValue(mockLayer);

    controller.showPosition();

    expect(controller['layer']).toBeDefined();
  });
});
