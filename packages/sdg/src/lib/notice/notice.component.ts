import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { IgoLanguageModule } from '@igo2/core/language';
import { NoticeType, NoticeIcon } from './notice.enum';

@Component({
  selector: 'sdg-notice',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, IgoLanguageModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {
  constructor() {}

  NoticeType = NoticeType;

  type = input.required<keyof typeof NoticeType>();
  icon = input<string | undefined>();
  title = input.required<string>();
  message = input.required<string>();
  isHandset = input<boolean>();

  getColoredZoneClass() {
    return `colored-zone --${NoticeType[this.type()]}`;
  }

  getColoredZoneIconClass() {
    return `--${NoticeType[this.type()]}`;
  }

  getColoredZoneIcon(): string | undefined {
    if (Object.keys(NoticeType).includes(this.type()) && !this.icon()) {
      return NoticeIcon[this.type()];
    } else {
      return this.icon();
    }
  }
}
