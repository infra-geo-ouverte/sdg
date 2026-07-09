import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { ISdgMap, IViewBaseOptions } from '../map/map.interface';
import { SdgMapBrowser } from './map-browser.component';

describe('SdgMapBrowser', () => {
  let component: SdgMapBrowser;
  let fixture: ComponentFixture<SdgMapBrowser>;
  let mockMap: ISdgMap<unknown>;

  beforeEach(async () => {
    mockMap = {
      setTarget: vi.fn(),
      updateView: vi.fn(),
      setInitialExtent: vi.fn()
    } as unknown as ISdgMap<unknown>;

    await TestBed.configureTestingModule({
      imports: [SdgMapBrowser],
      providers: TEST_CONFIG.providers
    }).compileComponents();

    fixture = TestBed.createComponent(SdgMapBrowser);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('map', mockMap);
    fixture.componentRef.setInput('view', {} as IViewBaseOptions);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the map target and calculate initial extent on AfterViewInit', () => {
    component.ngAfterViewInit();
    expect(mockMap.setTarget).toHaveBeenCalledWith(component.id);
    expect(mockMap.setInitialExtent).toHaveBeenCalled();
  });

  it('should update the map view when the view input changes', () => {
    const newView = { zoom: 5 } as IViewBaseOptions;
    fixture.componentRef.setInput('view', newView);

    fixture.detectChanges();

    expect(mockMap.updateView).toHaveBeenCalledWith(newView);
  });

  it('should unset the map target on OnDestroy', () => {
    component.ngOnDestroy();
    expect(mockMap.setTarget).toHaveBeenCalledWith(undefined);
  });
});
