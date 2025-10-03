import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  model,
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
  styleUrls: ['./lateral-menu-section.component.scss']
})
export class LateralMenuSectionComponent implements OnInit {
  readonly section = input.required<LateralMenuItem>();
  readonly menuOpened = model.required<boolean>();

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
