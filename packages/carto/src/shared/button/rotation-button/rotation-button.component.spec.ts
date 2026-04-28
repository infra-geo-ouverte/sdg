import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../test-config';
import { ISdgMap } from '../../map.interface';
import { RotationButtonComponent } from './rotation-button.component';

describe('RotationButtonComponent', () => {
  let component: RotationButtonComponent;
  let fixture: ComponentFixture<RotationButtonComponent>;
  let mockMap: ISdgMap;

  beforeEach(async () => {
    mockMap = {
      getMovementTarget: vi.fn().mockReturnValue({
        addEventListener: vi.fn(
          (event: string, callback: EventListenerOrEventListenerObject) => {
            if (event === 'change:rotation') {
              if (typeof callback === 'function') {
                callback(new Event('change'));
              } else {
                callback.handleEvent(new Event('change'));
              }
            }
          }
        ),
        removeEventListener: vi.fn()
      }),
      getRotationDegree: vi.fn().mockReturnValue(45),
      goTo: vi.fn()
    } as unknown as ISdgMap;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RotationButtonComponent],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(RotationButtonComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('map', mockMap);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize rotation on map rotation change', () => {
    expect(component.rotation()).toBe(45);
  });

  it('should reset the map rotation to 0', () => {
    component.reset();
    expect(mockMap.goTo).toHaveBeenCalledWith({ rotation: 0 });
  });
});
