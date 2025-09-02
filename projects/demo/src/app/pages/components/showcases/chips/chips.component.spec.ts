import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { ChipsDemoComponent } from './chips.component';

describe('ChipsDemoComponent', () => {
  let component: ChipsDemoComponent;
  let fixture: ComponentFixture<ChipsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
