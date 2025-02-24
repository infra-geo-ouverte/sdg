import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LateralMenuItem } from '../lateral-menu.interface';

@Component({
  selector: 'sdg-lateral-menu-item',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lateral-menu-item.component.html',
  styleUrls: ['./lateral-menu-item.component.scss']
})
export class LateralMenuItemComponent {
  item = input.required<LateralMenuItem>();
  isSectionItem = input<boolean>();
  isHandset = input.required<boolean>();
}
