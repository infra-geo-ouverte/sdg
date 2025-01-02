import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AlertIcon, AlertType } from './alert.interface';

@Component({
  selector: 'sdg-alert',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  readonly type = input.required<keyof typeof AlertType>();
  readonly message = input.required<string, string>({
    transform: (message) => this.messageValidation(message)
  });
  readonly closeable = input<boolean>(false);
  readonly isHandset = input.required<boolean>();
  readonly containerClass = input<string>();

  closed = output<boolean>();

  icon = computed(() => AlertIcon[this.type()]);
  typeName = computed(() => AlertType[this.type()]);

  private messageValidation(message: string): string {
    const maxLength: number = this.closeable() ? 105 : 120;

    return message.length > maxLength
      ? `${message.slice(0, maxLength)}...`
      : message;
  }

  getAlertClass(): string {
    return `--${this.typeName()}`;
  }

  close(): void {
    this.closed.emit(true);
  }
}
