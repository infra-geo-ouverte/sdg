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
  styleUrls: ['./notice.component.scss'],
  // Prevents the `title` input from leaking as a native title attribute (native tooltip) on the host element
  host: { '[attr.title]': 'null' }
})
export class NoticeComponent {
  NoticeType = NoticeType;

  readonly type = input.required<keyof typeof NoticeType>();
  readonly icon = input<string>();
  readonly title = input.required<string>();

  readonly coloredZoneClass = computed(() => `--${NoticeType[this.type()]}`);
}
