import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { ReferenceMapDemoComponent } from './reference-map.component';

describe('ReferenceMapDemoComponent', () => {
  let component: ReferenceMapDemoComponent;
  let fixture: ComponentFixture<ReferenceMapDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceMapDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ReferenceMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
