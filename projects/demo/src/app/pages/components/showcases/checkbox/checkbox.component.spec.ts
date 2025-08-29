import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

  it('should render normal and compact checkboxes', () => {
    const normalCheckbox = fixture.debugElement.query(
      By.css('mat-checkbox[value="normal1"]')
    );
    const compactCheckbox = fixture.debugElement.query(
      By.css('mat-checkbox[compact]')
    );
    expect(normalCheckbox).toBeTruthy();
    expect(compactCheckbox).toBeTruthy();
  });

  it('should have correct class for normal checkbox', () => {
    const normalCheckbox = fixture.debugElement.query(
      By.css('mat-checkbox[value="normal1"]')
    );
    expect(normalCheckbox.nativeElement.classList).toContain(
      'mat-mdc-checkbox'
    );
  });

  it('should have correct class for compact checkbox', () => {
    const compactCheckbox = fixture.debugElement.query(
      By.css('mat-checkbox[compact]')
    );
    expect(compactCheckbox.nativeElement.hasAttribute('compact')).toBeTrue();
  });

  it('should apply custom size to compact checkbox', () => {
    const compactCheckbox = fixture.debugElement.query(
      By.css('mat-checkbox[compact]')
    );
    const checkboxBackground = compactCheckbox.nativeElement.querySelector(
      '.mdc-checkbox__background'
    );
    const style = window.getComputedStyle(checkboxBackground);

    expect(style.height).toBe('16px');
    expect(style.width).toBe('16px');
  });

  it('should apply custom size to normal checkbox', () => {
    const normalCheckbox = fixture.debugElement.query(
      By.css('mat-checkbox[value="normal1"]')
    );
    const checkboxBackground = normalCheckbox.nativeElement.querySelector(
      '.mdc-checkbox__background'
    );
    const style = window.getComputedStyle(checkboxBackground);

    expect(style.height).toBe('24px');
    expect(style.width).toBe('24px');
  });
});
