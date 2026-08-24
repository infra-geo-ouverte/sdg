import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogClose } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { TEST_CONFIG } from '../../../../../../test-config';
import { DialogAlertDemoComponent } from './dialog-alert.component';

describe('DialogAlertDemoComponent', () => {
  let component: DialogAlertDemoComponent;
  let fixture: ComponentFixture<DialogAlertDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAlertDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAlertDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render alert title and content', () => {
    const title = fixture.nativeElement.querySelector(
      'h4[mat-dialog-title]'
    ) as HTMLHeadingElement;
    const content = fixture.nativeElement.querySelector(
      'mat-dialog-content span'
    ) as HTMLSpanElement;

    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Suppression définitive');
    expect(content).toBeTruthy();
    expect(content.textContent).toContain(
      'Cette action supprimera définitivement le document "Rapport_annuel.pdf".'
    );
    expect(content.textContent).toContain('Cette opération est irréversible.');
  });

  it('should expose expected dialog close payloads for action buttons', () => {
    const closeButtons = fixture.debugElement.queryAll(
      By.directive(MatDialogClose)
    );

    const cancelButton = closeButtons.find((button) =>
      button.nativeElement.textContent.includes('Annuler')
    );
    const deleteButton = closeButtons.find((button) =>
      button.nativeElement.textContent.includes('Supprimer')
    );

    expect(cancelButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();

    const cancelDialogClose = cancelButton!.injector.get(MatDialogClose);
    const deleteDialogClose = deleteButton!.injector.get(MatDialogClose);

    expect(cancelDialogClose.dialogResult).toBe('Action annulée');
    expect(deleteDialogClose.dialogResult).toBe('Le document a été supprimé.');
  });

  it('should render a warn destructive action button', () => {
    const deleteButton = fixture.nativeElement.querySelector(
      'button[color="warn"]'
    ) as HTMLButtonElement;

    expect(deleteButton).toBeTruthy();
    expect(deleteButton.textContent).toContain('Supprimer');
  });
});
