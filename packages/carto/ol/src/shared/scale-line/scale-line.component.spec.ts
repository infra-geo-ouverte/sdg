import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgOlScaleLine } from './scale-line.component';

describe('SdgOlScaleLine', () => {
  let component: SdgOlScaleLine;
  let fixture: ComponentFixture<SdgOlScaleLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgOlScaleLine]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgOlScaleLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
