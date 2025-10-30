import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/carto/test-config';
import { of } from 'rxjs';

import { GeolocationBase } from '../..';
import { GeolocateButtonComponent } from './geolocate-button.component';

const POSITION_MOCKED: GeolocationPosition = {
  coords: {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0
  },
  timestamp: Date.now()
} as GeolocationPosition;

describe('GeolocateButtonComponent', () => {
  let component: GeolocateButtonComponent;
  let fixture: ComponentFixture<GeolocateButtonComponent>;
  let mockController: jasmine.SpyObj<GeolocationBase>;

  beforeEach(async () => {
    mockController = jasmine.createSpyObj(
      'GeolocationBase',
      ['activate', 'deactivate', 'zoomToPosition'],
      {
        position$: of(POSITION_MOCKED)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [GeolocateButtonComponent],
      providers: [
        { provide: GeolocationBase, useValue: mockController },
        ...(TEST_CONFIG.providers ?? [])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocateButtonComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('controller', mockController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isActive state', () => {
    expect(component.isActive()).toBeFalse();
    component.toggle();
    expect(component.isActive()).toBeTrue();
    component.toggle();
    expect(component.isActive()).toBeFalse();
  });

  it('should activate the controller when toggled to active', () => {
    component.toggle();
    expect(mockController.activate).toHaveBeenCalled();
  });

  it('should deactivate the controller when toggled to inactive', () => {
    component.toggle(); // Activate first
    component.toggle(); // Deactivate
    expect(mockController.deactivate).toHaveBeenCalled();
  });

  it('should center position when activated and position is available', () => {
    component.toggle();
    expect(mockController.zoomToPosition).toHaveBeenCalledWith(POSITION_MOCKED);
  });
});
