import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { IgoLanguageModule } from '@igo2/core/language';

import { LegendDialogComponent } from '../legend-dialog/legend-dialog.component';

@Component({
  selector: 'sdg-legend-button',
  templateUrl: './legend-button.component.html',
  styleUrls: ['./legend-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatTooltip, IgoLanguageModule]
})
export class LegendButtonComponent {
  @Input() tooltipDisabled = false;
  @Input() legendInPanel = false;
  @Input() mobile = false;
  @Input({ required: true }) opened!: boolean;

  @Output() toggled = new EventEmitter<boolean>();

  public dialogRef?: MatDialogRef<LegendDialogComponent>;

  constructor(public dialog: MatDialog) {}

  get isOpened(): boolean {
    return (
      this.opened ?? !!this.dialog.getDialogById('legend-dialog-container')
    );
  }

  toggle(): void {
    if (!this.legendInPanel && !this.mobile) {
      const dialogOpened = this.dialog.getDialogById('legend-dialog-container');
      if (!dialogOpened) {
        this.dialogRef = this.dialog.open(LegendDialogComponent, {
          id: 'legend-dialog-container',
          hasBackdrop: false,
          closeOnNavigation: true
        });
      } else {
        this.dialogRef?.close();
      }
    }
    this.toggled.emit();
  }
}
