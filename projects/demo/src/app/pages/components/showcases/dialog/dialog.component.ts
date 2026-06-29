import {
  AfterContentInit,
  Component,
  ElementRef,
  inject,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import {
  Anchor,
  AnchorMenuComponent,
  ExternalLinkComponent,
  findTitleAnchors
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';
import { DialogActionDemoComponent } from './action/dialog-action.component';
import { DialogAlertDemoComponent } from './alert/dialog-alert.component';
import { DialogConfirmDemoComponent } from './confirm/dialog-confirm.component';

@Component({
  selector: 'app-dialog',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    AnchorMenuComponent,
    MatButtonModule
  ],
  templateUrl: './dialog.component.html',
  styles: `
    .content {
      display: flex;
      flex-flow: column;
      gap: var(--sdg-spacer-md);
    }
  `
})
export class DialogDemoComponent implements AfterContentInit {
  private elementRef = inject(ElementRef);
  readonly dialog = inject(MatDialog);

  result1 = signal<string | undefined>(undefined);
  result2 = signal<string | undefined>(undefined);
  result3 = signal<string | undefined>(undefined);

  anchors: Anchor[] = [];

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }

  openAlertDialog(): void {
    this.result1.set(undefined);
    const dialogRef = this.dialog.open(DialogAlertDemoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.result1.set(result);
    });
  }

  openConfirmDialog(): void {
    this.result2.set(undefined);
    const dialogRef = this.dialog.open(DialogConfirmDemoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.result2.set(result);
    });
  }

  openActionDialog(): void {
    this.result3.set(undefined);
    const dialogRef = this.dialog.open(DialogActionDemoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.result3.set(
        typeof result === 'string'
          ? result
          : `Nom: ${result?.name}, Courriel: ${result?.email}`
      );
    });
  }
}
