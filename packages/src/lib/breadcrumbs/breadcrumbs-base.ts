import { Directive, Signal, computed, input } from '@angular/core';

import {
  AnyBreadcrumb,
  BreadcrumbMenu,
  Breadcrumbs
} from './shared/breadcrumbs.interface';

@Directive()
export abstract class BreadcrumbsBase {
  abstract breadcrumbs: Signal<Breadcrumbs>;

  readonly isHandset = input(false);

  readonly breadcrumbsList = this.getBreadcrumbs();

  readonly hasBreadcrumbs = computed(() => this.breadcrumbsList().length > 0);

  isMenu(breadcrumb: AnyBreadcrumb): breadcrumb is BreadcrumbMenu {
    return !!(breadcrumb as BreadcrumbMenu)?.menu;
  }

  private getBreadcrumbs(): Signal<AnyBreadcrumb[]> {
    return computed(() => {
      const breads = this.breadcrumbs();

      if (this.isHandset()) {
        return breads.length > 1 ? [breads.at(-2)!] : [];
      } else if (breads.length >= 5) {
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
