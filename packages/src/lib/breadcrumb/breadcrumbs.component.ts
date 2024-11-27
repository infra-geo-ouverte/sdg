import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbsBase } from './breadcrumbs-base';
import { BreadcrumbsListComponent } from './breadcrumbs-list/breadcrumbs-list.component';
import { Breadcrumb } from './shared/breadcrumb.interface';

@Component({
  selector: 'sdg-breadcrumbs',
  standalone: true,
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
    }
  `,
  host: {
    '[class.d-none]': '!hasBreadcrumbs()'
  }
})
export class BreadcrumbsComponent extends BreadcrumbsBase {
  breadcrumbs = input.required<Breadcrumb[]>();
}
