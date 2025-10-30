import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NoticeType } from './notice.interface';

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

  readonly coloredZoneClass = computed(() => `--${NoticeType[this.type()]}`);
}
