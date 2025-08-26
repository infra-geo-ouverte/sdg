import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';
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
  readonly item = input.required<LateralMenuItem>();
  readonly isSectionItem = input<boolean>();
  readonly menuOpened = model.required<boolean>();
}
