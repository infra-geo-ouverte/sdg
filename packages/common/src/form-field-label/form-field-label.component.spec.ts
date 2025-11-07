import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TEST_CONFIG } from '../../test-config';
import { FormFieldLabelComponent } from './form-field-label.component';

describe('FormFieldLabelComponent', () => {
  let component: FormFieldLabelComponent;
  let fixture: ComponentFixture<FormFieldLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldLabelComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldLabelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('controlId', 'test-control');
    fixture.componentRef.setInput('formControlSize', 'md');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Label rendering', () => {
    it('should render the label text', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('.form-field-label-label')
      );
      expect(labelElement.nativeElement.textContent.trim()).toContain(
        'Test Label'
      );
    });

    it('should render the asterisk when required is true', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const asterisk = fixture.debugElement.query(
        By.css('.form-field-label-asterisk')
      );
      expect(asterisk).toBeTruthy();
      expect(asterisk.nativeElement.textContent).toBe('*');
    });

    it('should not render the asterisk when required is false', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('required', false);
      fixture.detectChanges();

      const asterisk = fixture.debugElement.query(
        By.css('.form-field-label-asterisk')
      );
      expect(asterisk).toBeNull();
    });

    it('should apply disabled class when disabled is true', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('.form-field-label-label')
      );
      expect(labelElement.nativeElement.classList).toContain('--disabled');
    });

    it('should not apply disabled class when disabled is false', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('.form-field-label-label')
      );
      expect(labelElement.nativeElement.classList).not.toContain('--disabled');
    });
  });

  describe('Clarification rendering', () => {
    it('should render clarification text when provided', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('clarification', 'This is a clarification');
      fixture.detectChanges();

      const clarification = fixture.debugElement.query(
        By.css('.form-field-label-clarification')
      );
      expect(clarification).toBeTruthy();
      expect(clarification.nativeElement.textContent).toBe(
        'This is a clarification'
      );
    });

    it('should not render clarification when not provided', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const clarification = fixture.debugElement.query(
        By.css('.form-field-label-clarification')
      );
      expect(clarification).toBeNull();
    });

    it('should apply disabled class to clarification when disabled is true', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('clarification', 'Clarification text');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const clarification = fixture.debugElement.query(
        By.css('.form-field-label-clarification')
      );
      expect(clarification.nativeElement.classList).toContain('--disabled');
    });

    it('should not apply disabled class to clarification when disabled is false', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('clarification', 'Clarification text');
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      const clarification = fixture.debugElement.query(
        By.css('.form-field-label-clarification')
      );
      expect(clarification.nativeElement.classList).not.toContain('--disabled');
    });
  });

  describe('CSS Styles', () => {
    it('should have correct display and flex properties on host', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const labelContainer = fixture.debugElement.query(
        By.css('.form-field-label-container')
      );
      const styles = window.getComputedStyle(labelContainer.nativeElement);

      expect(styles.display).toBe('flex');
      expect(styles.flexFlow).toBe('column nowrap');
    });

    it('should have bold font weight on label', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('.form-field-label-label')
      );
      const styles = window.getComputedStyle(labelElement.nativeElement);

      expect(styles.fontWeight).toBe('700'); // bold = 700
    });
  });

  describe('Input combinations', () => {
    it('should handle all inputs together', () => {
      fixture.componentRef.setInput('controlId', 'test-control');
      fixture.componentRef.setInput('formControlSize', 'md');
      fixture.componentRef.setInput('label', 'Complete Label');
      fixture.componentRef.setInput('clarification', 'Complete clarification');
      fixture.componentRef.setInput('required', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('.form-field-label-label')
      );
      const asterisk = fixture.debugElement.query(
        By.css('.form-field-label-asterisk')
      );
      const clarification = fixture.debugElement.query(
        By.css('.form-field-label-clarification')
      );

      expect(labelElement.nativeElement.textContent).toContain(
        'Complete Label'
      );
      expect(asterisk).toBeTruthy();
      expect(clarification.nativeElement.textContent).toBe(
        'Complete clarification'
      );
      expect(labelElement.nativeElement.classList).toContain('--disabled');
      expect(clarification.nativeElement.classList).toContain('--disabled');
    });
  });
});
