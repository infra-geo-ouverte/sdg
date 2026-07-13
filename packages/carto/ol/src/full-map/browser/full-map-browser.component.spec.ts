import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelService } from '@igo2/sdg-carto';

import { TEST_CONFIG } from '../../../../test-config';
import { SdgOlFullMapOptions } from '../full-map';
import { SdgOlFullMapBrowser } from './full-map-browser.component';

describe('SdgOlFullMapBrowser', () => {
  let component: SdgOlFullMapBrowser;
  let fixture: ComponentFixture<SdgOlFullMapBrowser>;
  let panelService: PanelService;

  const defaultOptions: SdgOlFullMapOptions = {
    view: {
      zoom: 6,
      center: [-71.8, 47.1]
    },
    basemaps: [],
    footer: {
      organization: { name: 'Test Org', url: 'https://example.com' },
      firstPublicationDate: '2024-01-01'
    },
    legend: true,
    navigation: {
      home: true,
      geolocation: true
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgOlFullMapBrowser],
      providers: TEST_CONFIG.providers
    })
      .overrideComponent(SdgOlFullMapBrowser, {
        set: { imports: [] }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgOlFullMapBrowser);
    component = fixture.componentInstance;
    panelService = component.panelService;

    fixture.componentRef.setInput('options', defaultOptions);
    fixture.componentRef.setInput('isHandset', false);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map on ngOnInit', () => {
    component.ngOnInit();

    expect(component.map).toBeDefined();
  });

  it('should initialize geolocation controller on ngOnInit', () => {
    component.ngOnInit();

    expect(component.geolocation).toBeDefined();
  });

  it('should emit mapReady on ngOnInit', () => {
    const spy = vi.fn();
    component.mapReady.subscribe(spy);

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(component.map);
  });

  it('should compute basemaps from options', () => {
    expect(component.basemaps()).toEqual([]);
  });

  it('should toggle legend panel when panel type is not legend', () => {
    component.ngOnInit();
    panelService.type.set('layers');
    panelService.expanded.set(true);

    component.toggleLegend();

    expect(panelService.type()).toBe('legend');
  });

  it('should close panel when legend is expanded, type is legend, and no defaultPanel', () => {
    component.ngOnInit();
    panelService.toggle('legend');
    panelService.expanded.set(true);

    component.toggleLegend();

    expect(panelService.expanded()).toBe(false);
  });

  it('should navigate to defaultPanel when legend is expanded and type is legend', () => {
    fixture.componentRef.setInput('options', {
      ...defaultOptions,
      sidepanel: { width: 380, defaultPanel: 'layers' }
    });
    component.ngOnInit();
    panelService.toggle('legend');
    panelService.expanded.set(true);

    component.toggleLegend();

    expect(panelService.type()).toBe('layers');
    expect(panelService.expanded()).toBe(true);
  });

  it('should expand panel when legend is collapsed and type is legend', () => {
    component.ngOnInit();
    panelService.toggle('legend');
    panelService.expanded.set(false);

    component.toggleLegend();

    expect(panelService.expanded()).toBe(true);
  });

  it('should use default labels when none provided', () => {
    expect(component.labels().legend?.label).toBe('Légende');
  });
});
