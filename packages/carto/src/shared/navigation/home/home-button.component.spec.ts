import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../test-config';
import { Extent, ISdgMap } from '../../map/map.interface';
import { SdgHomeButton } from './home-button.component';

describe('SdgHomeButton', () => {
  let component: SdgHomeButton;
  let fixture: ComponentFixture<SdgHomeButton>;
  let mockMap: ISdgMap;

  beforeEach(async () => {
    mockMap = {
      fit: vi.fn()
    } as unknown as ISdgMap;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [SdgHomeButton],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(SdgHomeButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('map', mockMap);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call map.fit with the initial extent when goHome is called', () => {
    const mockExtent: Extent = [0, 0, 10, 10];
    mockMap.initialExtent = mockExtent;

    component.goHome();

    expect(mockMap.fit).toHaveBeenCalledWith(mockExtent);
  });

  it('should not call map.fit if initial extent is undefined', () => {
    mockMap.initialExtent = undefined;

    component.goHome();

    expect(mockMap.fit).not.toHaveBeenCalled();
  });
});
