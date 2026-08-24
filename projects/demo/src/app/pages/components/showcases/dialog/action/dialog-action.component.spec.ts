import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogClose } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { TEST_CONFIG } from '../../../../../../test-config';
import { DialogActionDemoComponent } from './dialog-action.component';

describe('DialogActionDemoComponent', () => {
  let component: DialogActionDemoComponent;
  let fixture: ComponentFixture<DialogActionDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogActionDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogActionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls with empty values', () => {
    expect(component.nameControl.value).toBe('');
    expect(component.emailControl.value).toBe('');
  });

  it('should render and bind inputs to form controls', () => {
    component.nameControl.setValue('Jean Dupont');
    component.emailControl.setValue('jean.dupont@example.com');
    fixture.detectChanges();

    const nameInput = fixture.nativeElement.querySelector(
      'input#name'
    ) as HTMLInputElement;
    const emailInput = fixture.nativeElement.querySelector(
      'input#email'
    ) as HTMLInputElement;

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(nameInput.value).toBe('Jean Dupont');
    expect(emailInput.value).toBe('jean.dupont@example.com');
  });

  it('should expose expected dialog close payloads for action buttons', () => {
    component.nameControl.setValue('Camille Tremblay');
    component.emailControl.setValue('camille.tremblay@example.com');
    fixture.detectChanges();

    const closeButtons = fixture.debugElement.queryAll(
      By.directive(MatDialogClose)
    );

    const cancelButton = closeButtons.find((button) =>
      button.nativeElement.textContent.includes('Annuler')
    );
    const addButton = closeButtons.find((button) =>
      button.nativeElement.textContent.includes('Ajouter')
    );

    expect(cancelButton).toBeTruthy();
    expect(addButton).toBeTruthy();

    const cancelDialogClose = cancelButton!.injector.get(MatDialogClose);
    const addDialogClose = addButton!.injector.get(MatDialogClose);

    expect(cancelDialogClose.dialogResult).toBe('Action annulée');
    expect(addDialogClose.dialogResult).toEqual({
      name: 'Camille Tremblay',
      email: 'camille.tremblay@example.com'
    });
  });
});
