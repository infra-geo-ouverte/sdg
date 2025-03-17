import { Directive, Signal, computed } from '@angular/core';

import { BreakpointService } from '@igo2/sdg/core';

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
  isHandset: Signal<boolean>;

  constructor(private breakpointService: BreakpointService) {
    this.isHandset = this.breakpointService.isHandset;
  }

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
