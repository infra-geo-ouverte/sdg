import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-chips',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsDemoComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentColor = model('');
  readonly allColors: string[] = [
    'Rouge',
    'Orange',
    'Jaune',
    'Vert',
    'Bleu',
    'Indigo',
    'Violet',
    'Toutes les couleurs'
  ];
  readonly selectedColors = signal(['Rouge']);
  readonly filteredColors = computed(() => {
    const currentColor = this.currentColor().toLowerCase();
    return currentColor
      ? this.allColors.filter((color) =>
          color.toLowerCase().includes(currentColor)
        )
      : this.allColors.slice();
  });

  selectorChipsDisabled = signal<boolean>(false);
  navigationChipsDisabled = signal<boolean>(false);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedColors.update((colors) => [...colors, value]);
    }

    this.currentColor.set('');
  }

  remove(color: string): void {
    this.selectedColors.update((colors) => {
      const index = colors.indexOf(color);
      if (index < 0) {
        return colors;
      }

      colors.splice(index, 1);
      return [...colors];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedColors().includes(event.option.viewValue)) {
      this.remove(event.option.viewValue);
    } else {
      this.selectedColors.update((colors) => [
        ...colors,
        event.option.viewValue
      ]);
    }
    this.currentColor.set('');
    event.option.deselect();
  }
}
