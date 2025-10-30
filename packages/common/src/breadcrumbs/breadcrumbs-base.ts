import { Directive, Signal, computed } from '@angular/core';

import {
  AnyBreadcrumb,
  BreadcrumbMenu,
  Breadcrumbs
} from './shared/breadcrumbs.interface';

@Directive()
export abstract class BreadcrumbsBase {
  readonly hasBreadcrumbs = computed(() => this.breadcrumbsList().length > 0);

  abstract breadcrumbs: Signal<Breadcrumbs>;
  breadcrumbsList = this.getBreadcrumbs();

  isMenu(breadcrumb: AnyBreadcrumb): breadcrumb is BreadcrumbMenu {
    return !!(breadcrumb as BreadcrumbMenu)?.menu;
  }

  private getBreadcrumbs(): Signal<AnyBreadcrumb[]> {
    return computed(() => {
      const breads = this.breadcrumbs();

      if (breads.length >= 5) {
        const menu: BreadcrumbMenu = {
          id: 'menu',
          menu: breads.slice(2, -2)
        };
        return [...breads.slice(0, 2), menu, ...breads.slice(-2)];
      } else {
        return breads;
      }
    });
  }
}
