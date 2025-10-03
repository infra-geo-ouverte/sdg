import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { BreadcrumbsMenuComponent } from '../breadcrumbs-menu/breadcrumbs-menu.component';
import { AnyBreadcrumb, Breadcrumb, BreadcrumbMenu } from '../shared';

@Component({
  selector: 'sdg-breadcrumbs-list',
  imports: [RouterLink, MatIconModule, BreadcrumbsMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumbs-list.component.html',
  styleUrl: './breadcrumbs-list.component.scss'
})
export class BreadcrumbsListComponent {
  readonly breadcrumbs = input.required<AnyBreadcrumb[], AnyBreadcrumb[]>({
    transform: (value) => {
      this.assignFirstParent(value);
      return value;
    }
  });

  isMenu(breadcrumb: AnyBreadcrumb): breadcrumb is BreadcrumbMenu {
    return !!(breadcrumb as BreadcrumbMenu)?.menu;
  }

  private assignFirstParent(breads: AnyBreadcrumb[]): void {
    const lastElement = breads[breads.length - 1];

    if (!lastElement) {
      return;
    }

    if (this.isMenu(lastElement)) {
      (breads[breads.length - 2] as Breadcrumb).firstParent = true;
      return;
    }

    // e.g., for "/fr/a-propos/types-evenements", the last segment is "types-evenements"
    const lastSegment = lastElement.url.substring(
      lastElement.url.lastIndexOf('/') + 1
    );

    const firstValidParent = breads
      // Reverse the array to iterate from child to root (excluding the child itself)
      .slice(0, -1)
      .reverse()
      .find((parent) => {
        if (this.isMenu(parent)) {
          return false;
        }

        return parent.redirectTo !== lastSegment;
      }) as Breadcrumb;

    if (firstValidParent) {
      firstValidParent.firstParent = true;
    }
  }
}
