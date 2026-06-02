import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { LateralMenuItemComponent } from '../lateral-menu-item/lateral-menu-item.component';
import { LateralMenuItem } from '../lateral-menu.interface';

@Component({
  selector: 'sdg-lateral-menu-section',
  imports: [MatIconModule, LateralMenuItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lateral-menu-section.component.html',
  styleUrls: ['./lateral-menu-section.component.scss']
})
export class LateralMenuSectionComponent {
  readonly section = input.required<LateralMenuItem>();
  readonly menuOpened = model.required<boolean>();
  readonly currentUrl = input.required<string>();

  opened = signal(false);
  active = computed(() => {
    const url = this.currentUrl();
    const path = this.section().path;
    return url.includes(path);
  });

  constructor() {
    effect(() => {
      if (this.active()) {
        this.opened.set(true);
      }
    });
  }
}
