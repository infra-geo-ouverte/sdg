import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: 'dialog-alert.component.html',
  imports: [MatButtonModule, MatDialogModule, MatIconModule]
})
export class DialogAlertDemoComponent {}
