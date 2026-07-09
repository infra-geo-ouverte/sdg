import { ComponentFixture, TestBed } from '@angular/core/testing';

import olMap from 'ol/Map';
import View from 'ol/View';
import Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { SdgOlMap } from '..';
import { TEST_CONFIG } from '../../../../test-config';
import { SdgOlMiniBasemap } from './mini-basemap.component';

function createMockMap(): SdgOlMap {
  const map = Object.create(SdgOlMap.prototype) as SdgOlMap;
  const olMapInstance = new olMap({
    controls: [],
    view: new View({
      center: [0, 0],
      zoom: 5,
      projection: 'EPSG:3857'
    })
  });
  Object.defineProperty(map, 'engine', {
    value: olMapInstance,
    writable: true
  });
  Object.defineProperty(map, 'view', { get: () => olMapInstance.getView() });
  return map;
}

describe('SdgOlMiniBasemap', () => {
  let component: SdgOlMiniBasemap;
  let fixture: ComponentFixture<SdgOlMiniBasemap>;
  let mockMap: SdgOlMap;
  let basemap: Layer;

  beforeEach(async () => {
    mockMap = createMockMap();
    basemap = new TileLayer({
      source: new OSM(),
      visible: true
    });
    basemap.set('title', 'OpenStreetMap');

    await TestBed.configureTestingModule({
      imports: [SdgOlMiniBasemap],
      providers: TEST_CONFIG.providers
    })
      .overrideComponent(SdgOlMiniBasemap, {
        set: { imports: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(SdgOlMiniBasemap);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('parentMap', mockMap);
    fixture.componentRef.setInput('basemap', basemap);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs', () => {
    it('should have default display as true', () => {
      expect(component.display()).toBe(true);
    });

    it('should have default disabled as false', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should accept a title input', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();
      expect(component.title()).toBe('Test Title');
    });
  });

  describe('selectBasemap', () => {
    it('should emit basemapSelect when not disabled', () => {
      const spy = vi.fn();
      component.basemapSelect.subscribe(spy);

      component.selectBasemap();
      expect(spy).toHaveBeenCalledWith(basemap);
    });

    it('should not emit basemapSelect when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const spy = vi.fn();
      component.basemapSelect.subscribe(spy);

      component.selectBasemap();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    it('should create a mini map after view init', () => {
      component.ngAfterViewInit();
      expect(component.miniMap()).toBeDefined();
    });

    it('should create a mini map with setTarget method', () => {
      component.ngAfterViewInit();
      const miniMap = component.miniMap();
      expect(miniMap!.setTarget).toBeDefined();
    });
  });
});
