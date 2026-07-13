import { ComponentFixture, TestBed } from '@angular/core/testing';

import olMap from 'ol/Map';
import View from 'ol/View';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';

import { SdgOlMap } from '..';
import { TEST_CONFIG } from '../../../../test-config';
import { SdgOlBasemapSwitcher } from './basemap-switcher.component';

function createMockLayer(title: string, visible = true): Layer {
  const layer = new Layer({
    source: new Source({}),
    visible
  });
  layer.set('title', title);
  return layer;
}

function createMockMap(): SdgOlMap {
  const map = Object.create(SdgOlMap.prototype) as SdgOlMap;
  const olMapInstance = new olMap({
    controls: [],
    view: new View({
      center: [0, 0],
      zoom: 5
    })
  });
  Object.defineProperty(map, 'engine', {
    value: olMapInstance,
    writable: true
  });
  Object.defineProperty(map, 'view', { get: () => olMapInstance.getView() });
  return map;
}

describe('SdgOlBasemapSwitcher', () => {
  let component: SdgOlBasemapSwitcher;
  let fixture: ComponentFixture<SdgOlBasemapSwitcher>;
  let mockMap: SdgOlMap;
  let basemaps: Layer[];

  beforeEach(async () => {
    mockMap = createMockMap();
    basemaps = [
      createMockLayer('Topographic'),
      createMockLayer('Satellite'),
      createMockLayer('Street')
    ];

    await TestBed.configureTestingModule({
      imports: [SdgOlBasemapSwitcher],
      providers: TEST_CONFIG.providers
    })
      .overrideComponent(SdgOlBasemapSwitcher, {
        set: { imports: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(SdgOlBasemapSwitcher);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('map', mockMap);
    fixture.componentRef.setInput('basemaps', basemaps);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('inactiveBasemaps', () => {
    it('should return all basemaps except the active one', () => {
      const inactive = component.inactiveBasemaps();
      expect(inactive.length).toBe(2);
      expect(inactive).not.toContain(basemaps[0]);
      expect(inactive).toContain(basemaps[1]);
      expect(inactive).toContain(basemaps[2]);
    });

    it('should update when activeIndex changes', () => {
      component.activeIndex.set(1);
      const inactive = component.inactiveBasemaps();
      expect(inactive.length).toBe(2);
      expect(inactive).toContain(basemaps[0]);
      expect(inactive).not.toContain(basemaps[1]);
      expect(inactive).toContain(basemaps[2]);
    });
  });

  describe('displayedBasemaps', () => {
    it('should return only the first inactive basemap when collapsed', () => {
      component.expanded.set(false);
      const displayed = component.displayedBasemaps();
      expect(displayed.length).toBe(1);
      expect(displayed[0]).toBe(basemaps[1]);
    });

    it('should return all inactive basemaps when expanded', () => {
      component.expanded.set(true);
      const displayed = component.displayedBasemaps();
      expect(displayed.length).toBe(2);
      expect(displayed).toContain(basemaps[1]);
      expect(displayed).toContain(basemaps[2]);
    });
  });

  describe('selectBasemap', () => {
    it('should set the selected basemap as visible and hide others', () => {
      component.selectBasemap(basemaps[2]);

      expect(basemaps[0].getVisible()).toBe(false);
      expect(basemaps[1].getVisible()).toBe(false);
      expect(basemaps[2].getVisible()).toBe(true);
    });

    it('should update the activeIndex', () => {
      component.selectBasemap(basemaps[1]);
      expect(component.activeIndex()).toBe(1);
    });

    it('should collapse the switcher after selection when expanded', () => {
      component.expanded.set(true);
      component.selectBasemap(basemaps[2]);
      expect(component.expanded()).toBe(false);
    });

    it('should not change state if the layer is not in basemaps', () => {
      const unknownLayer = createMockLayer('Unknown');
      component.selectBasemap(unknownLayer);
      expect(component.activeIndex()).toBe(0);
    });
  });

  describe('getTitle', () => {
    it('should return the layer title property', () => {
      expect(component.getTitle(basemaps[0])).toBe('Topographic');
    });

    it('should return the default label title if layer has no title', () => {
      const layer = new Layer({ source: new Source({}) });
      expect(component.getTitle(layer)).toBe('Fonds');
    });
  });

  describe('labels', () => {
    it('should use default labels when no labels input is provided', () => {
      expect(component.labels().tooltip).toBe('Changer le fond de carte');
    });

    it('should use custom labels when provided', () => {
      fixture.componentRef.setInput('labels', {
        title: 'Basemaps',
        tooltip: 'Switch basemap'
      });
      fixture.detectChanges();
      expect(component.labels().tooltip).toBe('Switch basemap');
    });
  });
});
