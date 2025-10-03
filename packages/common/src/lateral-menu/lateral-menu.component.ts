import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { LateralMenuItemComponent } from './lateral-menu-item/lateral-menu-item.component';
import { LateralMenuSectionComponent } from './lateral-menu-section/lateral-menu-section.component';
import { LateralMenuSections } from './lateral-menu.interface';

@Component({
  selector: 'sdg-lateral-menu',
  imports: [
    MatIconModule,
    LateralMenuItemComponent,
    LateralMenuSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent {
  readonly title = input.required<string>();
  readonly sections = input.required<LateralMenuSections>();

  opened = model<boolean>(false);
}
