import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISdgMap, IViewBaseOptions } from '../map.interface';
import { SdgMapBrowserComponent } from './map-browser.component';

describe('SdgMapBrowserComponent', () => {
  let component: SdgMapBrowserComponent;
  let fixture: ComponentFixture<SdgMapBrowserComponent>;
  let mockMap: jasmine.SpyObj<ISdgMap<unknown>>;

  beforeEach(async () => {
    mockMap = jasmine.createSpyObj('ISdgMap', [
      'setTarget',
      'updateView',
      'setInitialExtent'
    ]);

    await TestBed.configureTestingModule({
      imports: [SdgMapBrowserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgMapBrowserComponent);
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
