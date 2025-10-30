import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';

import { IOlMapOptions } from '../map';
import {
  SDG_REFERENCE_MAP_CONFIG,
  SDG_REFERENCE_MAP_LABELS
} from './reference-map';
import { SdgReferenceMapOlComponent } from './reference-map.component';
import {
  ISdgMapLabels,
  ISdgReferenceMapConfig
} from './reference-map.interface';

describe('SdgReferenceMapOlComponent', () => {
  let component: SdgReferenceMapOlComponent;
  let fixture: ComponentFixture<SdgReferenceMapOlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgReferenceMapOlComponent],
      providers: [
        {
          provide: SDG_REFERENCE_MAP_CONFIG,
          useValue: {
            helpMessageDuration: 3000
          } satisfies ISdgReferenceMapConfig
        },
        {
          provide: SDG_REFERENCE_MAP_LABELS,
          useValue: {
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
          } satisfies ISdgMapLabels
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdgReferenceMapOlComponent);
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
      imports: [SdgReferenceMapOlComponent],
      providers: [
        {
          provide: SDG_REFERENCE_MAP_CONFIG,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgReferenceMapOlComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', {
      view: {
        zoom: 6,
        center: [-71.8, 47.1]
      }
    } satisfies IOlMapOptions);

    fixture.detectChanges();

    expect(component.config).toEqual({});
  });
});
