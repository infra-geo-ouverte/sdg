import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const INVALID_KEYS = [
  'Control',
  'Shift',
  'Alt',
  'Meta',
  'Tab',
  'CapsLock',
  'ArrowDown',
  'ArrowUp',
  'ArrowRight',
  'ArrowLeft'
];

@Component({
  selector: 'sdg-search-bar',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdgSearchBar {
  private readonly destroyRef = inject(DestroyRef);

  readonly placeholder = input<string>('Rechercher');
  readonly debounce = input<number>(300);
  readonly minLength = input<number>(2);

  /** Emits the search term when the user presses Enter or clicks the search button. */
  readonly search = output<string>();
  /** Emits the search term (debounced) as the user types. */
  readonly searchChange = output<string>();

  readonly inputEl =
    viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
  readonly term = signal('');

  private readonly stream$ = new Subject<string>();

  constructor() {
    this.stream$
      .pipe(
        debounceTime(this.debounce()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((term) => this.searchChange.emit(term));
  }

  onKeyup(event: KeyboardEvent): void {
    if (INVALID_KEYS.includes(event.key)) return;
    if (event.key === 'Enter') {
      this.onSearch();
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.term.set(value);
    if (value.length >= this.minLength() || value.length === 0) {
      this.stream$.next(value);
    }
  }

  onSearch(): void {
    this.search.emit(this.term());
  }

  onClear(): void {
    this.term.set('');
    this.stream$.next('');
    this.inputEl().nativeElement.focus();
  }
}
