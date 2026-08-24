import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { TEST_CONFIG } from '../../../../../test-config';
import { DialogActionDemoComponent } from './action/dialog-action.component';
import { DialogAlertDemoComponent } from './alert/dialog-alert.component';
import { DialogConfirmDemoComponent } from './confirm/dialog-confirm.component';
import { DialogDemoComponent } from './dialog.component';

describe('DialogDemoComponent', () => {
  let component: DialogDemoComponent;
  let fixture: ComponentFixture<DialogDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set anchors in ngAfterContentInit', () => {
    component.ngAfterContentInit();

    const anchorIds = component.anchors.map((anchor) => anchor.htmlElementId);

    expect(component.anchors.length).toBeGreaterThan(0);
    expect(anchorIds).toContain('section1');
    expect(anchorIds).toContain('section2');
    expect(anchorIds).toContain('section3');
  });

  it('should open alert dialog and set alert result when closed', () => {
    const close$ = new Subject<string | undefined>();
    const openSpy = vi.spyOn(component.dialog, 'open').mockReturnValue({
      afterClosed: () => close$.asObservable()
    } as MatDialog['open'] extends (...args: any[]) => infer T ? T : never);

    component.result1.set('Valeur precedente');
    component.openAlertDialog();

    expect(openSpy).toHaveBeenCalledWith(DialogAlertDemoComponent);
    expect(component.result1()).toBeUndefined();

    close$.next('Alerte fermee');
    expect(component.result1()).toBe('Alerte fermee');
  });

  it('should open confirm dialog and set confirm result when closed', () => {
    const close$ = new Subject<string | undefined>();
    const openSpy = vi.spyOn(component.dialog, 'open').mockReturnValue({
      afterClosed: () => close$.asObservable()
    } as MatDialog['open'] extends (...args: any[]) => infer T ? T : never);

    component.result2.set('Valeur precedente');
    component.openConfirmDialog();

    expect(openSpy).toHaveBeenCalledWith(DialogConfirmDemoComponent);
    expect(component.result2()).toBeUndefined();

    close$.next('Confirmation acceptee');
    expect(component.result2()).toBe('Confirmation acceptee');
  });

  it('should open action dialog and keep string result when closed', () => {
    const close$ = new Subject<string | { name: string; email: string }>();
    const openSpy = vi.spyOn(component.dialog, 'open').mockReturnValue({
      afterClosed: () => close$.asObservable()
    } as MatDialog['open'] extends (...args: any[]) => infer T ? T : never);

    component.result3.set('Valeur precedente');
    component.openActionDialog();

    expect(openSpy).toHaveBeenCalledWith(DialogActionDemoComponent);
    expect(component.result3()).toBeUndefined();

    close$.next('Action annulee');
    expect(component.result3()).toBe('Action annulee');
  });

  it('should open action dialog and format object result when closed', () => {
    const close$ = new Subject<{ name: string; email: string }>();
    vi.spyOn(component.dialog, 'open').mockReturnValue({
      afterClosed: () => close$.asObservable()
    } as MatDialog['open'] extends (...args: any[]) => infer T ? T : never);

    component.openActionDialog();
    close$.next({
      name: 'Camille Tremblay',
      email: 'camille.tremblay@example.com'
    });

    expect(component.result3()).toBe(
      'Nom: Camille Tremblay, Courriel: camille.tremblay@example.com'
    );
  });
});
