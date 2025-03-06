import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NoticeIcon, NoticeType } from './notice.interface';

@Component({
  selector: 'sdg-notice',
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

  readonly coloredZoneClass = computed(() => `--${NoticeType[this.type()]}`);
  readonly coloredZoneIcon = computed(() => {
    if (Object.keys(NoticeType).includes(this.type()) && !this.icon()) {
      return NoticeIcon[this.type()];
    } else {
      return this.icon();
    }
  });
}
