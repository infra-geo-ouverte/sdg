import { NgFor, NgIf } from '@angular/common';
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
  imports: [NgIf, NgFor, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  type = input.required<keyof typeof AlertType>();
  message = input.required<string, string>({
    transform: (message) => this.messageValidation(message)
  });
  isCloseable = input<boolean>(false);
  isOpen = input<boolean>(true);
  isHandset = input<boolean>();

  closed = output<boolean>();

  iconName = computed(() => AlertIcon[this.type()]);
  typeName = computed(() => AlertType[this.type()]);

  private messageValidation(message: string): string {
    const maxLength: number = this.isCloseable() ? 105 : 120;

    return message.length > maxLength
      ? `${message.slice(0, maxLength)}...`
      : message;
  }

  getAlertClass() {
    return `container --${this.typeName()}`;
  }

  getIconClass() {
    return `icon --${this.typeName()}`;
  }

  onClose() {
    this.closed.emit(true);
  }
}
