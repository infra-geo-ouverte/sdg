import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelService } from '@igo2/sdg-carto';

import { TEST_CONFIG } from '../../../test-config';
import { SdgOlFullMap, SdgOlFullMapOptions } from './full-map.component';

describe('SdgOlFullMap', () => {
  let component: SdgOlFullMap;
  let fixture: ComponentFixture<SdgOlFullMap>;
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
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgOlFullMap],
      providers: TEST_CONFIG.providers
    })
      .overrideComponent(SdgOlFullMap, {
        set: { imports: [], providers: [] }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgOlFullMap);
    component = fixture.componentInstance;
    panelService = component.panelService;

    fixture.componentRef.setInput('options', defaultOptions);
    fixture.componentRef.setInput('isHandset', false);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse panel on init when isHandset is true', () => {
    fixture.componentRef.setInput('isHandset', true);
    component.ngOnInit();

    expect(panelService.expanded()).toBe(false);
  });

  it('should not collapse panel on init when isHandset is false', () => {
    panelService.expanded.set(true);
    component.ngOnInit();

    expect(panelService.expanded()).toBe(true);
  });

  it('should emit searchChange when onSearchChange is called', () => {
    const spy = vi.fn();
    component.searchChange.subscribe(spy);

    component.onSearchChange('test query');

    expect(spy).toHaveBeenCalledWith('test query');
  });

  it('should set searchTerm on onSearchChange', () => {
    component.onSearchChange('hello');

    expect(component.searchTerm()).toBe('hello');
  });

  it('should toggle panel to search when a non-empty term is set and panel is not search', () => {
    panelService.type.set('legend');
    component.onSearchChange('query');

    expect(panelService.type()).toBe('search');
  });

  it('should close panel when empty term is set, panel is search, and no defaultPanel', () => {
    panelService.toggle('search');
    component.onSearchChange('');

    expect(panelService.expanded()).toBe(false);
  });

  it('should navigate to defaultPanel when empty term is set and panel is search', () => {
    fixture.componentRef.setInput('options', {
      ...defaultOptions,
      panel: { width: 380, defaultPanel: 'layers' }
    });
    panelService.toggle('search');
    component.onSearchChange('');

    expect(panelService.type()).toBe('layers');
    expect(panelService.expanded()).toBe(true);
  });

  it('should clear searchTerm on clearSearch', () => {
    component.searchTerm.set('something');
    component.clearSearch();

    expect(component.searchTerm()).toBe('');
  });

  it('should close panel on clearSearch when no defaultPanel', () => {
    panelService.toggle('search');
    component.clearSearch();

    expect(panelService.expanded()).toBe(false);
  });

  it('should reopen panel when searching again after clearSearch without defaultPanel', () => {
    component.onSearchChange('first query');
    expect(panelService.type()).toBe('search');
    expect(panelService.expanded()).toBe(true);

    component.clearSearch();
    expect(panelService.expanded()).toBe(false);
    expect(panelService.type()).toBe('search');

    component.onSearchChange('second query');
    expect(panelService.expanded()).toBe(true);
    expect(panelService.type()).toBe('search');
  });

  it('should navigate to defaultPanel on clearSearch', () => {
    fixture.componentRef.setInput('options', {
      ...defaultOptions,
      panel: { width: 380, defaultPanel: 'layers' }
    });
    panelService.toggle('search');
    component.clearSearch();

    expect(panelService.type()).toBe('layers');
    expect(panelService.expanded()).toBe(true);
  });

  it('should keep panel closed on clearSearch when panel was already closed', () => {
    fixture.componentRef.setInput('options', {
      ...defaultOptions,
      panel: { width: 380, defaultPanel: 'layers' }
    });
    panelService.toggle('search');
    panelService.expanded.set(false);

    component.clearSearch();

    expect(panelService.expanded()).toBe(false);
  });

  it('should collapse panel on clearSearch when isHandset is true', () => {
    fixture.componentRef.setInput('isHandset', true);
    panelService.expanded.set(true);
    component.clearSearch();

    expect(panelService.expanded()).toBe(false);
  });

  it('should have resultsLoading as false initially', () => {
    expect(component.resultsLoading()).toBe(false);
  });

  it('should have hasCustomSearchPanel as false when no content children', () => {
    expect(component.hasCustomSearchPanel()).toBe(false);
  });

  it('should set panel type to defaultPanel on init', () => {
    fixture.componentRef.setInput('options', {
      ...defaultOptions,
      panel: { defaultPanel: 'layers' }
    });
    component.ngOnInit();

    expect(panelService.type()).toBe('layers');
  });

  it('should keep search as default panel type when no defaultPanel and search enabled', () => {
    component.ngOnInit();

    expect(panelService.type()).toBe('search');
  });
});
