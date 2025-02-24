import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

import { BreadcrumbMenu } from '../shared/breadcrumbs.interface';

@Component({
  selector: 'sdg-breadcrumbs-menu',
  imports: [MatMenuModule, MatButtonModule, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumbs-menu.component.html',
  styleUrl: './breadcrumbs-menu.component.scss'
})
export class BreadcrumbsMenuComponent {
  breadcrumb = input.required<BreadcrumbMenu>();
}
