import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'packages/src/test-config';

import { MapFooterComponent } from './map-footer.component';

describe('MapFooterComponent', () => {
  let component: MapFooterComponent;
  let fixture: ComponentFixture<MapFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapFooterComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(MapFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
