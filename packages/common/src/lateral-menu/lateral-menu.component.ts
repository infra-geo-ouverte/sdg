import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  model,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';

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
  styleUrls: ['./lateral-menu.component.scss'],
  // Prevents the `title` input from leaking as a native title attribute (native tooltip) on the host element
  host: { '[attr.title]': 'null' }
})
export class LateralMenuComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly title = input.required<string>();
  readonly sections = input.required<LateralMenuSections>();

  opened = model<boolean>(false);
  currentUrl = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }
}
