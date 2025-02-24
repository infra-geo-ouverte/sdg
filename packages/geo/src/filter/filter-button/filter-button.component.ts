import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

import { IgoLanguageModule } from '@igo2/core/language';

@Component({
  selector: 'sdg-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatTooltip, IgoLanguageModule]
})
export class FilterButtonComponent {
  @Input() tooltipDisabled = false;
  @Input() opened = false;

  @Output() toggled = new EventEmitter<boolean>();

  toggle(): void {
    this.toggled.emit();
  }
}
