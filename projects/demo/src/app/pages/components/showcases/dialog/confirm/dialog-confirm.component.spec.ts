import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogClose } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { TEST_CONFIG } from '../../../../../../test-config';
import { DialogConfirmDemoComponent } from './dialog-confirm.component';

describe('DialogConfirmDemoComponent', () => {
  let component: DialogConfirmDemoComponent;
  let fixture: ComponentFixture<DialogConfirmDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogConfirmDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render confirm title and content', () => {
    const title = fixture.nativeElement.querySelector(
      'h4[mat-dialog-title]'
    ) as HTMLHeadingElement;
    const content = fixture.nativeElement.querySelector(
      'mat-dialog-content span'
    ) as HTMLSpanElement;

    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Compte créé');
    expect(content).toBeTruthy();
    expect(content.textContent).toContain(
      'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.'
    );
  });

  it('should expose expected dialog close payloads for action buttons', () => {
    const closeButtons = fixture.debugElement.queryAll(
      By.directive(MatDialogClose)
    );

    const closeIconButton = closeButtons.find((button) =>
      button.nativeElement.textContent.includes('close')
    );
    const connectButton = closeButtons.find((button) =>
      button.nativeElement.textContent.includes('Se connecter')
    );

    expect(closeIconButton).toBeTruthy();
    expect(connectButton).toBeTruthy();

    const closeIconDialogClose = closeIconButton!.injector.get(MatDialogClose);
    const connectDialogClose = connectButton!.injector.get(MatDialogClose);

    expect(closeIconDialogClose.dialogResult).toBe('');
    expect(connectDialogClose.dialogResult).toBe('Vous êtes connecté.');
  });

  it('should render an icon close button and primary action button', () => {
    const closeIcon = fixture.nativeElement.querySelector(
      'button[matIconButton] mat-icon'
    ) as HTMLElement;
    const connectButton = fixture.nativeElement.querySelector(
      'button[matButton="filled"]'
    ) as HTMLButtonElement;

    expect(closeIcon).toBeTruthy();
    expect(closeIcon.textContent).toContain('close');
    expect(connectButton).toBeTruthy();
    expect(connectButton.textContent).toContain('Se connecter');
  });
});
