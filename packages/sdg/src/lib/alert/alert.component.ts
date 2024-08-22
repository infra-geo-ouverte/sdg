import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IgoLanguageModule } from '@igo2/core/language';

import { AlertIcon, AlertType } from './alert.interface';

@Component({
  selector: 'sdg-alert',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, IgoLanguageModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor() {}

  type = input.required<keyof typeof AlertType>();
  message = input.required<string>();
  closeable = input<boolean>(false);
  isHandset = input<boolean>();

  showAlert = true;

  getAlertClass() {
    return `container --${AlertType[this.type()]}`;
  }

  getIconClass() {
    return `icon --${AlertType[this.type()]}`;
  }

  getIcon(): string | undefined {
    return AlertIcon[this.type()];
  }
}
