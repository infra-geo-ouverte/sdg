import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { IgoLanguageModule } from '@igo2/core/language';
import { NoticeType, NoticeIcon } from './notice.enum';
import { AppService } from 'projects/demo/src/app/app.service';

@Component({
  selector: 'sdg-notice',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, IgoLanguageModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {
  constructor(private appService: AppService) {}

  NoticeType = NoticeType;

  type = input.required<keyof typeof NoticeType>();
  icon = input<string | undefined>();
  title = input.required<string>();
  message = input.required<string>();

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }

  getColoredZoneClass() {
    return this.type() ? `colored-zone --${NoticeType[this.type()]}` : '';
  }

  getColoredZoneIconClass() {
    return this.type() ? `--${NoticeType[this.type()]}` : '';
  }

  getColoredZoneIcon(): string | undefined {
    if (Object.keys(NoticeType).includes(this.type?.()) && !this.icon?.()) {
      return NoticeIcon[this.type()];
    } else {
      return this.icon();
    }
  }
}
