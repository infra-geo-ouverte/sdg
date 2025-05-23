import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { LateralMenuItemComponent } from '../lateral-menu-item/lateral-menu-item.component';
import { LateralMenuItem } from '../lateral-menu.interface';

@Component({
  selector: 'sdg-lateral-menu-section',
  imports: [MatIconModule, LateralMenuItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lateral-menu-section.component.html',
  styleUrls: ['./lateral-menu-section.component.scss'],
  animations: [
    trigger('openCloseSection', [
      state('closed', style({ height: 0, overflow: 'hidden' })),
      state(
        'opened',
        style({
          height: AUTO_STYLE,
          overflow: AUTO_STYLE,
          'padding-top': '8px',
          'padding-bottom': '8px'
        })
      ),
      transition('closed <=> opened', animate('0.2s ease-in-out'))
    ]),
    trigger('openCloseArrow', [
      state('closed', style({ transform: 'rotate(0)' })),
      state(
        'opened',
        style({
          transform: 'rotate(180deg)'
        })
      ),
      transition('closed <=> opened', animate('0.2s ease-in-out'))
    ])
  ]
})
export class LateralMenuSectionComponent implements OnInit {
  readonly section = input.required<LateralMenuItem>();

  opened = signal(false);

  active = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.active = this.router.url.includes(this.section().path);

    if (this.active) {
      this.opened.set(true);
    }
  }

  toggle(): void {
    this.opened.set(!this.opened());
  }
}
