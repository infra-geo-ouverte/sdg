import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormFieldLabelComponent } from '@igo2/sdg-common';

@Component({
  selector: 'app-dialog-action',
  templateUrl: 'dialog-action.component.html',
  styles: `
    mat-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  `,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FormFieldLabelComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule
  ]
})
export class DialogActionDemoComponent {
  readonly nameControl = new FormControl('', { nonNullable: true });
  readonly emailControl = new FormControl('', { nonNullable: true });
}
