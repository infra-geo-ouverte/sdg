import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbItemComponent } from '../breadcrumb-item/breadcrumb-item.component';
import { BreadcrumbMenuComponent } from '../breadcrumb-menu/breadcrumb-menu.component';
import { AnyBreadcrumb, BreadcrumbMenu } from '../shared';

@Component({
  selector: 'sdg-breadcrumbs-list',
  standalone: true,
  imports: [BreadcrumbItemComponent, BreadcrumbMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol>
      @for (
        breadcrumb of breadcrumbs();
        track breadcrumb.id;
        let last = $last
      ) {
        @if (isMenu(breadcrumb!)) {
          <sdg-breadcrumb-menu [breadcrumb]="breadcrumb" />
        } @else {
          <sdg-breadcrumb-item
            [breadcrumb]="breadcrumb!"
            [last]="last"
            [isHandset]="isHandset()"
          />
        }
      }
    </ol>
  `,
  styles: `
    ol {
      background-color: transparent;
      display: inline-flex;
      list-style: none;
      align-items: center;
      flex-wrap: wrap;

      padding: unset;
      margin: 16px 0 12px;
    }

    sdg-breadcrumb-item,
    sdg-breadcrumb-menu {
      margin-right: 4px;
    }
  `
})
export class BreadcrumbsListComponent {
  breadcrumbs = input.required<AnyBreadcrumb[]>();
  isHandset = input(false);

  isMenu(breadcrumb: AnyBreadcrumb): breadcrumb is BreadcrumbMenu {
    return !!(breadcrumb as BreadcrumbMenu)?.menu;
  }
}
