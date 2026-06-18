import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FormFieldLabelComponent } from '@igo2/sdg-common';

import { map, startWith } from 'rxjs';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-autocomplete',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ExampleViewerComponent,
    FormFieldLabelComponent,
    MatIconModule
  ],
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteDemoComponent {
  myControl = new FormControl('');
  options: string[] = [
    'Chat',
    'Chien',
    'Lapin',
    'Hamster',
    'Souris grise',
    'Poisson rouge',
    "Cochon d'Inde",
    'Perruche ondulée'
  ];
  filteredOptions = toSignal(
    this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    ),
    { initialValue: this.options }
  );

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
