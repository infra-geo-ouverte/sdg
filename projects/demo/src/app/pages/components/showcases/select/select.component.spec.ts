import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TEST_CONFIG } from '../../../../../test-config';
import { SelectDemoComponent } from './select.component';

describe('SelectDemoComponent', () => {
  let component: SelectDemoComponent;
  let fixture: ComponentFixture<SelectDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should initialize with disabled signals set to false', () => {
      expect(component.disabled1()).toBe(false);
      expect(component.disabled2()).toBe(false);
    });

    it('should initialize colorControl with null value', () => {
      expect(component.colorControl.value).toBeNull();
    });

    it('should have 7 colors in the colors array', () => {
      expect(component.colors.length).toBe(7);
    });

    it('should have correct color values', () => {
      const colorValues = component.colors.map((c) => c.value);
      expect(colorValues).toEqual([
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
        'violet'
      ]);
    });
  });

  describe('Select rendering', () => {
    it('should render multiple select dropdowns with different sizes', () => {
      const selects = fixture.debugElement.queryAll(By.css('mat-select'));
      expect(selects.length).toBeGreaterThan(0);
    });

    it('should render select with lg size', () => {
      const lgFormField = fixture.debugElement.query(
        By.css('mat-form-field[lg]')
      );
      expect(lgFormField).toBeTruthy();
    });

    it('should render select with md size', () => {
      const mdFormFields = fixture.debugElement.queryAll(
        By.css('mat-form-field[md]')
      );
      expect(mdFormFields.length).toBeGreaterThan(0);
    });

    it('should render select with sm size', () => {
      const smFormField = fixture.debugElement.query(
        By.css('mat-form-field[sm]')
      );
      expect(smFormField).toBeTruthy();
    });

    it('should render select with xs size', () => {
      const xsFormField = fixture.debugElement.query(
        By.css('mat-form-field[xs]')
      );
      expect(xsFormField).toBeTruthy();
    });

    it('should render all color options in select', () => {
      const select = fixture.debugElement.query(By.css('mat-select'));
      select.nativeElement.click();
      fixture.detectChanges();

      const options = fixture.debugElement.queryAll(By.css('mat-option'));
      expect(options.length).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Disabled state', () => {
    it('should disable first group of selects when disabled1 is true', () => {
      component.disabled1.set(true);
      fixture.detectChanges();

      const selects = fixture.debugElement.queryAll(By.css('mat-select'));
      const firstGroupSelects = selects.slice(0, 4);

      firstGroupSelects.forEach((select) => {
        expect(select.componentInstance.disabled).toBe(true);
      });
    });

    it('should enable first group of selects when disabled1 is false', () => {
      component.disabled1.set(false);
      fixture.detectChanges();

      const selects = fixture.debugElement.queryAll(By.css('mat-select'));
      const firstGroupSelects = selects.slice(0, 4);

      firstGroupSelects.forEach((select) => {
        expect(select.componentInstance.disabled).toBe(false);
      });
    });

    it('should toggle disabled1 state when button is clicked', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const firstButton = buttons[0];

      expect(component.disabled1()).toBe(false);
      firstButton.nativeElement.click();
      fixture.detectChanges();
      expect(component.disabled1()).toBe(true);
      firstButton.nativeElement.click();
      fixture.detectChanges();
      expect(component.disabled1()).toBe(false);
    });

    it('should disable second select when disabled2 is true', () => {
      component.disabled2.set(true);
      fixture.detectChanges();

      const selects = fixture.debugElement.queryAll(By.css('mat-select'));
      const lastSelect = selects[selects.length - 1];
      expect(lastSelect.componentInstance.disabled).toBe(true);
    });
  });

  describe('Form validation', () => {
    it('should have colorControl with required validator', () => {
      expect(component.colorControl.hasError('required')).toBe(true);
    });

    it('should be valid when a color is selected', () => {
      component.colorControl.setValue(component.colors[0]);
      expect(component.colorControl.valid).toBe(true);
      expect(component.colorControl.hasError('required')).toBe(false);
    });

    it('should display error message when colorControl has error and not disabled', () => {
      component.disabled2.set(false);
      component.colorControl.markAsTouched();
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(By.css('mat-error'));
      expect(errorElement).toBeTruthy();
      expect(errorElement.nativeElement.textContent).toContain(
        'Choisissez une couleur'
      );
    });

    it('should not display error message when disabled', () => {
      component.disabled2.set(true);
      component.colorControl.markAsTouched();
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(By.css('mat-error'));
      expect(errorElement).toBeNull();
    });

    it('should display warning icon in error message', () => {
      component.disabled2.set(false);
      component.colorControl.markAsTouched();
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('mat-error mat-icon'));
      expect(icon).toBeTruthy();
      expect(icon.nativeElement.textContent).toBe('warning');
    });
  });

  describe('Form field labels', () => {
    it('should render form field labels', () => {
      const labels = fixture.debugElement.queryAll(
        By.css('sdg-form-field-label')
      );
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should render required indicator on last select', () => {
      const labels = fixture.debugElement.queryAll(
        By.css('sdg-form-field-label')
      );
      const lastLabel = labels[labels.length - 1];
      expect(lastLabel.componentInstance.required()).toBe(true);
    });

    it('should pass disabled state to labels in first group', () => {
      component.disabled1.set(true);
      fixture.detectChanges();

      const labels = fixture.debugElement.queryAll(
        By.css('sdg-form-field-label')
      );
      const firstGroupLabels = labels.slice(0, 4);

      firstGroupLabels.forEach((label) => {
        expect(label.componentInstance.disabled()).toBe(true);
      });
    });
  });

  describe('Button behavior', () => {
    it('should render toggle buttons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length).toBe(2);
    });

    it('should display correct button text when disabled1 is false', () => {
      component.disabled1.set(false);
      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const firstButton = buttons[0];
      expect(firstButton.nativeElement.textContent).toContain(
        'Désactiver les listes déroulantes'
      );
    });

    it('should display correct button text when disabled1 is true', () => {
      component.disabled1.set(true);
      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const firstButton = buttons[0];
      expect(firstButton.nativeElement.textContent).toContain(
        'Activer les listes déroulantes'
      );
    });

    it('should have compact attribute on buttons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button[compact]'));
      expect(buttons.length).toBe(2);
    });
  });
});
