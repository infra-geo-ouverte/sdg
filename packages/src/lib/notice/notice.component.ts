import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NoticeIcon, NoticeType } from './notice.interface';

@Component({
  selector: 'sdg-notice',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {
  NoticeType = NoticeType;

  readonly type = input.required<keyof typeof NoticeType>();
  readonly icon = input<string>();
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly isHandset = input.required<boolean>();

  getColoredZoneClass() {
    return `--${NoticeType[this.type()]}`;
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
