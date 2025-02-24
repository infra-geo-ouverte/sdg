import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { Breadcrumb } from '../shared/breadcrumbs.interface';

@Component({
  selector: 'sdg-breadcrumbs-item',
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumbs-item.component.html',
  styleUrl: './breadcrumbs-item.component.scss'
})
export class BreadcrumbsItemComponent {
  breadcrumb = input.required<Breadcrumb>();
  last = input.required<boolean>();
  isHandset = input<boolean>();
}
