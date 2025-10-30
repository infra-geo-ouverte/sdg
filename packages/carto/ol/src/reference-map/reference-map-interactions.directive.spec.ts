import { Component, Renderer2 } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SdgMapBrowserComponent } from '@igo2/sdg-carto';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { IOlMapOptions, SdgOlMap } from '../map';
import { SdgReferenceMapInteractionsDirective } from './reference-map-interactions.directive';

const DEFAULT_OPTIONS: IOlMapOptions = {
  view: {
    zoom: 6,
    center: [-71.8, 47.1]
  },
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ]
};

@Component({
  template: `<igo-map-browser
    sdgReferenceMapInteractions
    [map]="map"
    class="flex-fill"
  />`,
  imports: [SdgMapBrowserComponent, SdgReferenceMapInteractionsDirective]
})
class TestComponent {
  map = new SdgOlMap(DEFAULT_OPTIONS);
}

describe('SdgReferenceMapInteractionsDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: SdgReferenceMapInteractionsDirective;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, SdgReferenceMapInteractionsDirective],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: Renderer2,
          useValue: jasmine.createSpyObj('Renderer2', [
            'createElement',
            'appendChild',
            'removeChild'
          ])
        },
        {
          provide: SdgOlMap,
          useValue: jasmine.createSpyObj('SdgOlMap', ['engine'])
        }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    const debugElement = fixture.debugElement.query(
      By.directive(SdgReferenceMapInteractionsDirective)
    );
    directive = debugElement.injector.get(SdgReferenceMapInteractionsDirective);
    renderer = debugElement.injector.get(Renderer2);

    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should set isHover to true on mouse enter', () => {
    spyOn(directive.isHover, 'set');
    directive.hostMouseEnter();
    expect(directive.isHover.set).toHaveBeenCalledWith(true);
  });

  it('should set isHover to false on mouse leave', () => {
    spyOn(directive.isHover, 'set');
    directive.hostMouseLeave();
    expect(directive.isHover.set).toHaveBeenCalledWith(false);
  });

  it('should set mapEventRestriction to "ctrlScroll" on mouse wheel without modifier key', () => {
    spyOn(directive.mapEventRestriction, 'set');
    const event = new WheelEvent('wheel', { ctrlKey: false });
    directive['onMouseWheel'](event);
    expect(directive.mapEventRestriction.set).toHaveBeenCalledWith(
      'ctrlScroll'
    );
  });

  it('should add a message element when isHover and mapEventRestriction are set', () => {
    spyOn(renderer, 'createElement').and.callThrough();
    spyOn(renderer, 'appendChild').and.callThrough();

    directive.isHover.set(true);
    directive.mapEventRestriction.set('ctrlScroll');
    directive['addMessageElement']();

    expect(renderer.createElement).toHaveBeenCalledWith('div');
    expect(renderer.appendChild).toHaveBeenCalled();
  });

  it('should remove the message element when removeMessageElement is called', () => {
    spyOn(renderer, 'removeChild').and.callThrough();

    directive['messageElement'] = renderer.createElement('div');
    directive['removeMessageElement']();

    expect(renderer.removeChild).toHaveBeenCalled();
    expect(directive['messageElement']).toBeUndefined();
  });

  it('should reset mapEventRestriction on map leave', () => {
    spyOn(directive.mapEventRestriction, 'set');
    directive['onMapLeave']();
    expect(directive.mapEventRestriction.set).toHaveBeenCalledWith(undefined);
  });
});
