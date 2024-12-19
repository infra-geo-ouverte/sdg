import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { LateralMenuSectionComponent } from './lateral-menu-section.component';

describe('LateralMenuSectionComponent', () => {
  let component: LateralMenuSectionComponent;
  let fixture: ComponentFixture<LateralMenuSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralMenuSectionComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(LateralMenuSectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('section', [{ path: '', title: 'Test' }]);
    fixture.componentRef.setInput('isHandset', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
