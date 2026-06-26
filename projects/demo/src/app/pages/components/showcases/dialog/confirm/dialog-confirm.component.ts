import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: 'dialog-confirm.component.html',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatTooltipModule]
})
export class DialogConfirmDemoComponent {}
