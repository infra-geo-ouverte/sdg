import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NoticeIcon, NoticeType } from './notice.interface';

@Component({
  selector: 'sdg-notice',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {
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
