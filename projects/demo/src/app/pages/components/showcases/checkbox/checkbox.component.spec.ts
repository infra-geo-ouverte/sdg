import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { CheckboxDemoComponent } from './checkbox.component';

describe('CheckboxDemoComponent', () => {
  let component: CheckboxDemoComponent;
  let fixture: ComponentFixture<CheckboxDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
