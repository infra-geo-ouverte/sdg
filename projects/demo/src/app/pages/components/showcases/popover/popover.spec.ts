import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { PopoverDemoComponent } from './popover';

describe('PopoverDemoComponent', () => {
  let component: PopoverDemoComponent;
  let fixture: ComponentFixture<PopoverDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
