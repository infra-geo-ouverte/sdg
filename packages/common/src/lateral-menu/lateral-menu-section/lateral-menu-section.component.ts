import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  model,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';

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
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  readonly section = input.required<LateralMenuItem>();
  readonly menuOpened = model.required<boolean>();

  opened = signal(false);
  active = signal(false);

  ngOnInit(): void {
    this.updateActive(this.router.url);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        this.updateActive(event.urlAfterRedirects);
      });
  }

  private updateActive(url: string): void {
    this.active.set(url.includes(this.section().path));

    if (this.active()) {
      this.opened.set(true);
    }
  }
}
