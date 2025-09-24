import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbsBase } from './breadcrumbs-base';
import { BreadcrumbsListComponent } from './breadcrumbs-list/breadcrumbs-list.component';
import { Breadcrumbs } from './shared';

@Component({
  selector: 'sdg-breadcrumbs',
  imports: [BreadcrumbsListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sdg-breadcrumbs-list
      [breadcrumbs]="breadcrumbsList()"
      [isHandset]="isHandset()"
    />
  `,
  styles: `
    :host {
      display: block;

      &.d-none {
        display: none;
      }
    }
  `,
  host: {
    '[class.d-none]': '!hasBreadcrumbs()'
  }
})
export class BreadcrumbsComponent extends BreadcrumbsBase {
  readonly breadcrumbs = input.required<Breadcrumbs>();
}
