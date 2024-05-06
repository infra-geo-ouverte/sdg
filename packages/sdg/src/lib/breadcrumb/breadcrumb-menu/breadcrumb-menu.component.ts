import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

import { BreadcrumbMenu } from '../shared/breadcrumb.interface';

@Component({
  selector: 'sdg-breadcrumb-menu',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb-menu.component.html',
  styleUrl: './breadcrumb-menu.component.scss'
})
export class BreadcrumbMenuComponent {
  breadcrumb = input.required<BreadcrumbMenu>();
}
