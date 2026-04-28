import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../test-config';
import { ISdgMap } from '../../map.interface';
import { ZoomButtonComponent } from './zoom-button.component';

describe('ZoomButtonComponent', () => {
  let component: ZoomButtonComponent;
  let fixture: ComponentFixture<ZoomButtonComponent>;
  let mockMap: ISdgMap;
  let getZoomSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getZoomSpy = vi.fn().mockReturnValue(1);
    mockMap = {
      getZoom: getZoomSpy,
      getMaxZoom: vi.fn().mockReturnValue(10),
      getMinZoom: vi.fn().mockReturnValue(0),
      goTo: vi.fn(),
      getMovementTarget: vi.fn().mockReturnValue({
        addEventListener: vi.fn(
          (_event: string, callback: EventListenerOrEventListenerObject) => {
            if (typeof callback === 'function') {
              callback(new Event('change'));
            } else {
              callback.handleEvent(new Event('change'));
            }
          }
        ),
        removeEventListener: vi.fn()
      })
    } as unknown as ISdgMap;

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
    getZoomSpy.mockReturnValue(10);
    component.ngOnInit();
    expect(component.maxDisabled()).toBeTruthy();
  });

  it('should disable zoom out button when zoom is at min', () => {
    getZoomSpy.mockReturnValue(0);
    component.ngOnInit();
    expect(component.minDisabled()).toBeTruthy();
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
    getZoomSpy.mockReturnValue(5);
    component.ngOnInit();
    expect(component.zoom()).toBe(5);
  });
});
