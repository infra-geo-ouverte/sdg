import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/carto/test-config';

import { ISdgMap } from '../../map.interface';
import { ZoomButtonComponent } from './zoom-button.component';

describe('ZoomButtonComponent', () => {
  let component: ZoomButtonComponent;
  let fixture: ComponentFixture<ZoomButtonComponent>;
  let mockMap: jasmine.SpyObj<ISdgMap>;

  beforeEach(async () => {
    mockMap = jasmine.createSpyObj('ISdgMap', [
      'getZoom',
      'getMaxZoom',
      'getMinZoom',
      'goTo',
      'getMovementTarget'
    ]);
    mockMap.getZoom.and.returnValue(1);
    mockMap.getMaxZoom.and.returnValue(10);
    mockMap.getMinZoom.and.returnValue(0);
    mockMap.getMovementTarget.and.returnValue({
      addEventListener: jasmine
        .createSpy('addEventListener')
        .and.callFake((_, callback) => {
          callback();
        }),
      removeEventListener: jasmine.createSpy('removeEventListener')
    });

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ZoomButtonComponent],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('map', mockMap);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize zoom value on ngOnInit', () => {
    component.ngOnInit();
    expect(component.zoom()).toBe(1);
  });

  it('should disable zoom in button when zoom is at max', () => {
    mockMap.getZoom.and.returnValue(10);
    component.ngOnInit();
    expect(component.maxDisabled()).toBeTrue();
  });

  it('should disable zoom out button when zoom is at min', () => {
    mockMap.getZoom.and.returnValue(0);
    component.ngOnInit();
    expect(component.minDisabled()).toBeTrue();
  });

  it('should call map.goTo with increased zoom on zoomIn', () => {
    component.zoomIn();
    expect(mockMap.goTo).toHaveBeenCalledWith({ zoom: 2, duration: 250 });
  });

  it('should call map.goTo with decreased zoom on zoomOut', () => {
    component.zoomOut();
    expect(mockMap.goTo).toHaveBeenCalledWith({ zoom: 0, duration: 250 });
  });

  it('should update zoom value on map resolution change', () => {
    mockMap.getZoom.and.returnValue(5);
    component.ngOnInit();
    expect(component.zoom()).toBe(5);
  });
});
