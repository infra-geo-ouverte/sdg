import { Component, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {
  ExternalLinkComponent,
  FormFieldLabelComponent
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';
import { merge } from 'rxjs';

@Component({
  selector: 'app-form-field',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormFieldLabelComponent
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldDemoComponent {
  disabled1 = signal<boolean>(false);
  disabled2 = signal<boolean>(false);
  disabled3 = signal<boolean>(false);

  maxLength = 50;

  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal<string>('');

  constructor() {
    effect(() => {
      this.disabled3() ? this.email.disable() : this.email.enable();
    });

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set("L'adresse courriel est obligatoire.");
    } else if (this.email.hasError('email')) {
      this.errorMessage.set("L'adresse courriel n'est pas valide.");
    } else {
      this.errorMessage.set('');
    }
  }
}
