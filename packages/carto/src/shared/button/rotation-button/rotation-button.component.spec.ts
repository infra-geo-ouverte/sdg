import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/carto/test-config';

import { ISdgMap } from '../../map.interface';
import { RotationButtonComponent } from './rotation-button.component';

describe('RotationButtonComponent', () => {
  let component: RotationButtonComponent;
  let fixture: ComponentFixture<RotationButtonComponent>;
  let mockMap: jasmine.SpyObj<ISdgMap>;

  beforeEach(async () => {
    mockMap = jasmine.createSpyObj('ISdgMap', [
      'getMovementTarget',
      'getRotationDegree',
      'goTo'
    ]);
    mockMap.getMovementTarget.and.returnValue({
      addEventListener: jasmine
        .createSpy('addEventListener')
        .and.callFake((event, callback) => {
          if (event === 'change:rotation') {
            callback();
          }
        }),
      removeEventListener: jasmine.createSpy('removeEventListener') // Added mock for removeEventListener
    });
    mockMap.getRotationDegree.and.returnValue(45);

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
