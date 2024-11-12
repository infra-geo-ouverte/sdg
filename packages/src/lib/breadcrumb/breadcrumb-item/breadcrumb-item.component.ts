import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { Breadcrumb } from '../shared/breadcrumb.interface';

@Component({
  selector: 'sdg-breadcrumb-item',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb-item.component.html',
  styleUrl: './breadcrumb-item.component.scss'
})
export class BreadcrumbItemComponent {
  breadcrumb = input.required<Breadcrumb>();
  last = input.required<boolean>();
  isHandset = input<boolean>();
}
