import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  ExternalLinkComponent,
  FormFieldLabelComponent
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormFieldLabelComponent
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDemoComponent {
  disabled1 = signal<boolean>(false);
  disabled2 = signal<boolean>(false);

  colorControl = new FormControl<Color | null>(null, Validators.required);

  colors: Color[] = [
    { value: 'red', viewValue: 'Rouge' },
    { value: 'orange', viewValue: 'Orange' },
    { value: 'yellow', viewValue: 'Jaune' },
    { value: 'green', viewValue: 'Vert' },
    { value: 'blue', viewValue: 'Bleu' },
    { value: 'indigo', viewValue: 'Indigo' },
    { value: 'violet', viewValue: 'Violet' }
  ];

  constructor() {
    effect(() => {
      this.disabled2()
        ? this.colorControl.disable()
        : this.colorControl.enable();
    });
  }
}
