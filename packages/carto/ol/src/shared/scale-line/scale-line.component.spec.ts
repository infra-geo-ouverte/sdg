import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgScaleLine } from './scale-line.component';

describe('SdgScaleLine', () => {
  let component: SdgScaleLine;
  let fixture: ComponentFixture<SdgScaleLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgScaleLine]
    }).compileComponents();

    fixture = TestBed.createComponent(SdgScaleLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
