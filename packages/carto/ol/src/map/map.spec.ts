import olMap from 'ol/Map';
import { Extent } from 'ol/extent';
import { fromLonLat } from 'ol/proj';

import { SdgOlMap } from './map';
import { IOlMapOptions, IOlViewOptions } from './map.interface';

describe('SdgOlMap', () => {
  let map: SdgOlMap;
  let options: IOlMapOptions;

  beforeEach(() => {
    options = {
      layers: [],
      view: {
        center: [0, 0],
        zoom: 2,
        animation: { duration: 500 }
      },
      interactions: true
    };
    map = new SdgOlMap(options);
  });

  it('should create an instance', () => {
    expect(map).toBeTruthy();
    expect(map.engine).toBeInstanceOf(olMap);
  });

  it('should merge options with default options', () => {
    expect(map.options.view.animation?.duration).toBe(500);
  });

  it('should set the target', () => {
    const target = 'map-container';
    map.setTarget(target);
    expect(map.engine.getTarget()).toBe(target);
  });

  it('should update the view', () => {
    const newViewOptions: IOlViewOptions = { zoom: 5, center: [10, 10] };
    map.updateView(newViewOptions);
    expect(map.view.getZoom()).toBe(5);
    expect(map.view.getCenter()).toEqual(fromLonLat(newViewOptions.center!));
  });

  it('should fit the view to an extent', () => {
    const extent: Extent = [0, 0, 100, 100];
    spyOn(map.view, 'fit');
    map.fit(extent);
    expect(map.view.fit).toHaveBeenCalledWith(extent, options.view.animation);
  });

  it('should animate the view', () => {
    const animationOptions = { zoom: 4, duration: 300 };
    spyOn(map.view, 'animate');
    map.goTo(animationOptions);
    expect(map.view.animate).toHaveBeenCalledWith({
      ...options.view.animation,
      ...animationOptions
    });
  });

  it('should get zoom, min zoom, and max zoom', () => {
    spyOn(map.view, 'getZoom').and.returnValue(3);
    spyOn(map.view, 'getMinZoom').and.returnValue(1);
    spyOn(map.view, 'getMaxZoom').and.returnValue(10);

    expect(map.getZoom()).toBe(3);
    expect(map.getMinZoom()).toBe(1);
    expect(map.getMaxZoom()).toBe(10);
  });
});
