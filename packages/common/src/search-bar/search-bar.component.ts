import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  InjectionToken,
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

import { WithLabels } from '../shared/label/with-labels';

export const DEFAULT_MIN_LENGTH = 2;

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

export interface SearchBarLabels {
  placeholder: string;
  reset: string;
  search: string;
}

export const DEFAULT_SEARCH_BAR_LABELS: Required<SearchBarLabels> = {
  placeholder: 'Rechercher',
  reset: 'Réinitialiser la recherche',
  search: 'Faire une recherche'
};

export const SEARCH_BAR_LABELS = new InjectionToken<SearchBarLabels>(
  'SDG_SEARCH_BAR_LABELS'
);

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
export class SdgSearchBar extends WithLabels<SearchBarLabels> {
  private readonly destroyRef = inject(DestroyRef);

  readonly color = input<'dark' | 'light'>('dark');
  readonly debounce = input<number>(300);
  readonly minLength = input<number | undefined>(DEFAULT_MIN_LENGTH);

  /** Emits the search term when the user presses Enter or clicks the search button. */
  readonly searchSubmit = output<string>();
  /** Emits the term (debounced) as the user types, regardless of its length. */
  readonly termChange = output<string>();
  /** Emits an empty or valid-length search term after the debounce. */
  readonly searchChange = output<string>();
  readonly clear = output<void>();

  readonly inputEl =
    viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
  readonly term = signal('');

  private readonly stream$ = new Subject<string>();

  constructor() {
    super(DEFAULT_SEARCH_BAR_LABELS, SEARCH_BAR_LABELS);

    this.stream$
      .pipe(
        debounceTime(this.debounce()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((term) => {
        this.termChange.emit(term);
        if (
          term.length >= (this.minLength() ?? DEFAULT_MIN_LENGTH) ||
          term.length === 0
        ) {
          this.searchChange.emit(term);
        }
      });
  }

  onKeyup(event: KeyboardEvent): void {
    if (INVALID_KEYS.includes(event.key)) return;
    if (event.key === 'Enter') {
      this.onSearch();
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.term.set(value);
    this.stream$.next(value);
  }

  onSearch(): void {
    this.searchSubmit.emit(this.term());
  }

  onClear(): void {
    this.term.set('');
    this.stream$.next('');
    this.inputEl().nativeElement.focus();
    this.clear.emit();
  }
}
