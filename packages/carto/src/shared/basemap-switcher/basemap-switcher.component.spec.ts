import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { SdgBasemapSwitcher } from './basemap-switcher.component';

describe('SdgBasemapSwitcher', () => {
  let component: SdgBasemapSwitcher;
  let fixture: ComponentFixture<SdgBasemapSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgBasemapSwitcher],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(SdgBasemapSwitcher);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('basemapCount', 3);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('visible', () => {
    it('should be visible when basemapCount is greater than 1', () => {
      fixture.componentRef.setInput('basemapCount', 2);
      fixture.detectChanges();
      expect(component.visible).toBe(true);
    });

    it('should not be visible when basemapCount is 1', () => {
      fixture.componentRef.setInput('basemapCount', 1);
      fixture.detectChanges();
      expect(component.visible).toBe(false);
    });

    it('should not be visible when basemapCount is 0', () => {
      fixture.componentRef.setInput('basemapCount', 0);
      fixture.detectChanges();
      expect(component.visible).toBe(false);
    });
  });

  describe('toggle', () => {
    it('should toggle expanded from false to true', () => {
      expect(component.expanded()).toBe(false);
      component.toggle();
      expect(component.expanded()).toBe(true);
    });

    it('should toggle expanded from true to false', () => {
      component.expanded.set(true);
      component.toggle();
      expect(component.expanded()).toBe(false);
    });
  });

  describe('labels', () => {
    it('should use default labels when no labels input is provided', () => {
      expect(component.labels().title).toBe('Fonds');
      expect(component.labels().tooltip).toBe('Changer le fond de carte');
    });

    it('should use custom labels when provided', () => {
      fixture.componentRef.setInput('labels', {
        title: 'Basemaps',
        tooltip: 'Switch basemap'
      });
      fixture.detectChanges();
      expect(component.labels().title).toBe('Basemaps');
      expect(component.labels().tooltip).toBe('Switch basemap');
    });

    it('should fallback to default labels when undefined is provided', () => {
      fixture.componentRef.setInput('labels', undefined);
      fixture.detectChanges();
      expect(component.labels().title).toBe('Fonds');
      expect(component.labels().tooltip).toBe('Changer le fond de carte');
    });
  });
});
