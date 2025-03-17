import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';

import { IOlMapOptions } from '../map';
import {
  SDG_REFERENCE_MAP_OPTIONS,
  SdgReferenceMapDefaultOptions
} from './reference-map';
import { SdgOlReferenceMapComponent } from './reference-map.component';

describe('SdgOlReferenceMapComponent', () => {
  let component: SdgOlReferenceMapComponent;
  let fixture: ComponentFixture<SdgOlReferenceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgOlReferenceMapComponent],
      providers: [
        {
          provide: SDG_REFERENCE_MAP_OPTIONS,
          useValue: {
            helpMessageDuration: 3000,
            labels: {
              buttons: {
                geolocation: {
                  active: 'Activate geolocation',
                  inactive: 'Deactivate geolocation'
                }
              },
              restrictions: {
                ctrlScroll: 'Use Ctrl + scroll to zoom the map',
                twoFingers: 'Use two fingers to zoom the map'
              }
            }
          } satisfies SdgReferenceMapDefaultOptions
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgOlReferenceMapComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('options', {
      view: {
        zoom: 6,
        center: [-71.8, 47.1]
      }
    } satisfies IOlMapOptions);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map and geolocation on ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();

    component.ngOnInit();

    expect(component.map).toBeDefined();
    expect(component.geolocation).toBeDefined();
  });

  it('should use default options if provided', () => {
    TestBed.resetTestingModule(); // Reset the testing module to allow overriding providers

    TestBed.configureTestingModule({
      imports: [SdgOlReferenceMapComponent],
      providers: [
        {
          provide: SDG_REFERENCE_MAP_OPTIONS,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgOlReferenceMapComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', {
      view: {
        zoom: 6,
        center: [-71.8, 47.1]
      }
    } satisfies IOlMapOptions);

    fixture.detectChanges();

    expect(component.defaultOptions).toEqual({});
  });
});
