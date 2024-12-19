import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../../test-config';
import { LateralMenuItemComponent } from './lateral-menu-item.component';

describe('LateralMenuItemComponent', () => {
  let component: LateralMenuItemComponent;
  let fixture: ComponentFixture<LateralMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralMenuItemComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(LateralMenuItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', [{ path: '', title: 'Test' }]);
    fixture.componentRef.setInput('isHandset', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
