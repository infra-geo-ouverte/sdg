import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgoMap } from '@igo2/geo';

import { TEST_CONFIG } from '../../../../../src/test-config';
import { MapScreenPanelComponent } from './map-screen-panel.component';

describe('MapScreenPanelComponent', () => {
  let component: MapScreenPanelComponent;
  let ref: ComponentRef<MapScreenPanelComponent>;
  let fixture: ComponentFixture<MapScreenPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapScreenPanelComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(MapScreenPanelComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    const map = new IgoMap();

    ref.setInput('type', '');
    ref.setInput('map', map);
    ref.setInput('queryState', {});
    ref.setInput('searchState', {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
