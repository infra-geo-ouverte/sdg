import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/carto/test-config';

import { Extent, ISdgMap } from '../../map.interface';
import { HomeButtonComponent } from './home-button.component';

describe('HomeButtonComponent', () => {
  let component: HomeButtonComponent;
  let fixture: ComponentFixture<HomeButtonComponent>;
  let mockMap: jasmine.SpyObj<ISdgMap>;

  beforeEach(async () => {
    mockMap = jasmine.createSpyObj('ISdgMap', ['fit']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HomeButtonComponent],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(HomeButtonComponent);
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
