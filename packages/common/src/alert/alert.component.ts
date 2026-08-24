import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AlertType } from './alert.interface';

@Component({
  selector: 'sdg-alert',
  imports: [MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  host: {
    '[class]': 'typeClass()'
  }
})
export class AlertComponent {
  readonly type = input.required<keyof typeof AlertType>();
  readonly closeable = input<boolean>(false);
  readonly containerClass = input<string>('');

  readonly typeClass = computed(() => `--${AlertType[this.type()]}`);

  closed = output<boolean>();

  close(): void {
    this.closed.emit(true);
  }
}
