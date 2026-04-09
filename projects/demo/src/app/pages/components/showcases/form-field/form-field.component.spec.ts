import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TEST_CONFIG } from '../../../../../test-config';
import { FormFieldDemoComponent } from './form-field.component';

describe('FormFieldDemoComponent', () => {
  let component: FormFieldDemoComponent;
  let fixture: ComponentFixture<FormFieldDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldDemoComponent);
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
      expect(component.disabled3()).toBe(false);
    });

    it('should initialize email FormControl with empty string', () => {
      expect(component.email.value).toBe('');
    });

    it('should set maxLength to 50', () => {
      expect(component.maxLength).toBe(50);
    });

    it('should set errorMessage based on email validation state', () => {
      expect(component.errorMessage()).toBe(
        "L'adresse courriel est obligatoire."
      );
    });
  });

  describe('Form field rendering', () => {
    it('should render form fields with different sizes', () => {
      const lgField = fixture.debugElement.query(By.css('mat-form-field[lg]'));
      const mdFields = fixture.debugElement.queryAll(
        By.css('mat-form-field[md]')
      );
      const smField = fixture.debugElement.query(By.css('mat-form-field[sm]'));
      const xsField = fixture.debugElement.query(By.css('mat-form-field[xs]'));

      expect(lgField).toBeTruthy();
      expect(mdFields.length).toBeGreaterThan(0);
      expect(smField).toBeTruthy();
      expect(xsField).toBeTruthy();
    });

    it('should render multiline form field', () => {
      const multiField = fixture.debugElement.query(
        By.css('mat-form-field[multi]')
      );
      expect(multiField).toBeTruthy();

      const textarea = multiField.query(By.css('textarea'));
      expect(textarea).toBeTruthy();
    });

    it('should render form field labels', () => {
      const labels = fixture.debugElement.queryAll(
        By.css('sdg-form-field-label')
      );
      expect(labels.length).toBeGreaterThan(0);
    });
  });

  describe('Disabled state management', () => {
    it('should disable first group of inputs when disabled1 is true', () => {
      component.disabled1.set(true);
      fixture.detectChanges();

      const inputs = fixture.debugElement.queryAll(By.css('input[matInput]'));
      const firstGroupInputs = inputs.slice(0, 4);

      firstGroupInputs.forEach((input) => {
        expect(input.nativeElement.disabled).toBe(true);
      });
    });

    it('should disable textarea when disabled1 is true', () => {
      component.disabled1.set(true);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      expect(textarea.nativeElement.disabled).toBe(true);
    });

    it('should toggle disabled1 state when first button is clicked', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const firstButton = buttons[0];

      expect(component.disabled1()).toBe(false);
      firstButton.nativeElement.click();
      fixture.detectChanges();
      expect(component.disabled1()).toBe(true);
    });

    it('should disable hint input when disabled2 is true', () => {
      component.disabled2.set(true);
      fixture.detectChanges();

      const formFields = fixture.debugElement.queryAll(
        By.css('mat-form-field')
      );
      const fieldWithHint = formFields.find((field) => {
        const hint = field.query(By.css('mat-hint'));
        const input = field.query(By.css('input[disabled]'));
        return hint && input && !field.query(By.css('input[formControl]'));
      });
      const input = fieldWithHint?.query(By.css('input'));
      expect(input?.nativeElement.disabled).toBe(true);
    });

    it('should disable and enable email FormControl based on disabled3', () => {
      expect(component.email.disabled).toBe(false);

      component.disabled3.set(true);
      fixture.detectChanges();
      expect(component.email.disabled).toBe(true);

      component.disabled3.set(false);
      fixture.detectChanges();
      expect(component.email.disabled).toBe(false);
    });
  });

  describe('Email validation', () => {
    it('should have required validator on email control', () => {
      component.email.setValue('');
      component.email.markAsTouched();
      expect(component.email.hasError('required')).toBe(true);
    });

    it('should have email validator on email control', () => {
      component.email.setValue('invalid-email');
      component.email.markAsTouched();
      expect(component.email.hasError('email')).toBe(true);
    });

    it('should be valid with a proper email address', () => {
      component.email.setValue('test@example.com');
      expect(component.email.valid).toBe(true);
    });

    it('should update error message when email is required', () => {
      component.email.setValue('');
      component.updateErrorMessage();
      expect(component.errorMessage()).toBe(
        "L'adresse courriel est obligatoire."
      );
    });

    it('should update error message when email is invalid', () => {
      component.email.setValue('invalid-email');
      component.updateErrorMessage();
      expect(component.errorMessage()).toBe(
        "L'adresse courriel n'est pas valide."
      );
    });

    it('should clear error message when email is valid', () => {
      component.email.setValue('test@example.com');
      component.updateErrorMessage();
      expect(component.errorMessage()).toBe('');
    });

    it('should display error message when email is invalid', () => {
      component.email.setValue('invalid');
      component.email.markAsTouched();
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(By.css('mat-error'));
      expect(errorElement).toBeTruthy();
      expect(errorElement.nativeElement.textContent).toContain(
        "L'adresse courriel n'est pas valide."
      );
    });

    it('should display warning icon in error message', () => {
      component.email.setValue('');
      component.email.markAsTouched();
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('mat-error mat-icon'));
      expect(icon).toBeTruthy();
      expect(icon.nativeElement.textContent).toBe('warning');
    });
  });

  describe('Max length functionality', () => {
    it('should display max length hint', () => {
      const hints = fixture.debugElement.queryAll(By.css('mat-hint'));
      expect(hints.length).toBeGreaterThan(0);
      expect(hints[0].nativeElement.textContent).toContain('Maximum 50');
    });

    it('should set maxlength attribute on inputs with hints', () => {
      const inputsWithMaxLength = fixture.debugElement.queryAll(
        By.css('input[maxlength]')
      );
      expect(inputsWithMaxLength.length).toBeGreaterThan(0);
      inputsWithMaxLength.forEach((input) => {
        expect(input.nativeElement.getAttribute('maxlength')).toBe('50');
      });
    });
  });

  describe('Button behavior', () => {
    it('should render toggle buttons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length).toBe(3);
    });

    it('should display correct button text when disabled1 is false', () => {
      component.disabled1.set(false);
      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons[0].nativeElement.textContent).toContain(
        'Désactiver les champs texte'
      );
    });

    it('should display correct button text when disabled1 is true', () => {
      component.disabled1.set(true);
      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons[0].nativeElement.textContent).toContain(
        'Activer les champs texte'
      );
    });

    it('should have compact attribute on buttons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button[compact]'));
      expect(buttons.length).toBe(3);
    });
  });

  describe('Form field labels', () => {
    it('should render required indicator on email field', () => {
      const labels = fixture.debugElement.queryAll(
        By.css('sdg-form-field-label')
      );
      const emailLabel = labels.find(
        (label) => label.componentInstance.label() === 'Adresse courriel'
      );
      expect(emailLabel?.componentInstance.required()).toBe(true);
    });

    it('should render clarification text on appropriate field', () => {
      const labels = fixture.debugElement.queryAll(
        By.css('sdg-form-field-label')
      );
      const labelWithClarification = labels.find((label) =>
        label.componentInstance.clarification()
      );
      expect(labelWithClarification).toBeTruthy();
      expect(labelWithClarification?.componentInstance.clarification()).toBe(
        '#, rue, ville'
      );
    });

    it('should pass disabled state to labels', () => {
      component.disabled1.set(true);
      fixture.detectChanges();

      const labels = fixture.debugElement.queryAll(
        By.css('sdg-form-field-label')
      );
      const disabledLabels = labels.filter((label) =>
        label.componentInstance.disabled()
      );
      expect(disabledLabels.length).toBeGreaterThan(0);
    });
  });

  describe('Effect and subscription handling', () => {
    it('should update error message when email status changes', (done) => {
      component.email.setValue('invalid');
      setTimeout(() => {
        expect(component.errorMessage()).toBe(
          "L'adresse courriel n'est pas valide."
        );
        done();
      }, 100);
    });

    it('should update error message when email value changes', (done) => {
      component.email.setValue('test@example.com');
      setTimeout(() => {
        expect(component.errorMessage()).toBe('');
        done();
      }, 100);
    });
  });
});
