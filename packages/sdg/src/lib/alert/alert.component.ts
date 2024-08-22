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
  message = input.required<string>();
  closeable = input<boolean>(false);
  isOpen = input<boolean>(true);
  isHandset = input<boolean>();

  closed = output<boolean>();

  iconName = computed(() => AlertIcon[this.type()]);
  typeName = computed(() => AlertType[this.type()]);

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
