import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { LateralMenuComponent } from './lateral-menu.component';

describe('LateralMenuComponent', () => {
  let component: LateralMenuComponent;
  let fixture: ComponentFixture<LateralMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralMenuComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(LateralMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test');
    fixture.componentRef.setInput('sections', [{ path: '', title: 'Test' }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
