import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { RadioButtonDemoComponent } from './radio-button.component';

describe('RadioButtonDemoComponent', () => {
  let component: RadioButtonDemoComponent;
  let fixture: ComponentFixture<RadioButtonDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
