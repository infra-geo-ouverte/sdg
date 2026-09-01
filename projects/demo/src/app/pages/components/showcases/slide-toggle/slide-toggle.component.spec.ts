import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../../../test-config';
import { SlideToggleDemoComponent } from './slide-toggle.component';

describe('SlideToggleDemoComponent', () => {
  let component: SlideToggleDemoComponent;
  let fixture: ComponentFixture<SlideToggleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideToggleDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideToggleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
