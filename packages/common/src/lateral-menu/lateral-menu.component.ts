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
  Signal,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { BreakpointService } from '@igo2/sdg-core';

import { LateralMenuItemComponent } from './lateral-menu-item/lateral-menu-item.component';
import { LateralMenuSectionComponent } from './lateral-menu-section/lateral-menu-section.component';
import { LateralMenuSections } from './lateral-menu.interface';
import { LateralMenuService } from './lateral-menu.service';

@Component({
  selector: 'sdg-lateral-menu',
  imports: [
    MatIconModule,
    LateralMenuItemComponent,
    LateralMenuSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss'],
  animations: [
    trigger('openCloseSection', [
      state('closed', style({ height: '0', overflow: 'hidden' })),
      state(
        'opened',
        style({
          height: AUTO_STYLE,
          overflow: AUTO_STYLE
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
export class LateralMenuComponent {
  readonly title = input.required<string>();
  readonly sections = input.required<LateralMenuSections>();

  isHandset: Signal<boolean>;

  constructor(
    private breakpointService: BreakpointService,
    public lateralMenuService: LateralMenuService
  ) {
    this.isHandset = this.breakpointService.isHandset;
  }

  toggle(): void {
    this.lateralMenuService.toggle();
  }
}
