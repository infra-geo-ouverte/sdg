import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbsItemComponent } from '../breadcrumbs-item/breadcrumbs-item.component';
import { BreadcrumbsMenuComponent } from '../breadcrumbs-menu/breadcrumbs-menu.component';
import { AnyBreadcrumb, BreadcrumbMenu } from '../shared';

@Component({
  selector: 'sdg-breadcrumbs-list',
  standalone: true,
  imports: [BreadcrumbsItemComponent, BreadcrumbsMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol>
      @for (
        breadcrumb of breadcrumbs();
        track breadcrumb.id;
        let last = $last
      ) {
        @if (isMenu(breadcrumb!)) {
          <sdg-breadcrumbs-menu [breadcrumb]="breadcrumb" />
        } @else {
          <sdg-breadcrumbs-item
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

    sdg-breadcrumbs-item,
    sdg-breadcrumbs-menu {
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
