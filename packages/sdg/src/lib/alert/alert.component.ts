import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IgoLanguageModule } from '@igo2/core/language';

import { AlertIcon, AlertType } from './alert.interface';

@Component({
  selector: 'sdg-alert',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    IgoLanguageModule,
    MatIconModule,
    MatButtonModule
  ],
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
    if (this.isCloseable()) {
      if (message.length > 105) {
        return `${message.slice(0, 105)}...`;
      }

      return message;
    } else {
      if (message.length > 120) {
        return `${message.slice(0, 120)}...`;
      }

      return message;
    }
  }

  getAlertClass() {
    return `container --${this.typeName()}`;
  }

  getIconClass() {
    return `icon --${this.typeName()}`;
  }

  onClose() {
    if (this.isCloseable()) {
      console.log('hello');
    }
    this.closed.emit(true);
  }
}
