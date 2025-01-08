import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgoMap } from '@igo2/geo';

import { TEST_CONFIG } from '../../../../../src/test-config';
import { MapScreenPanelComponent } from './map-screen-panel.component';

describe('MapScreenPanelComponent', () => {
  let component: MapScreenPanelComponent;
  let fixture: ComponentFixture<MapScreenPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapScreenPanelComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(MapScreenPanelComponent);
    component = fixture.componentInstance;

    const map = new IgoMap();

    fixture.componentRef.setInput('type', '');
    fixture.componentRef.setInput('map', map);
    fixture.componentRef.setInput('queryState', {});
    fixture.componentRef.setInput('searchState', {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
