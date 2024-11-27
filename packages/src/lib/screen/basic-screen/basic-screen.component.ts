import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbsWithRouterComponent } from '../../breadcrumb/breadcrumbs-with-router.component';

@Component({
  selector: 'sdg-basic-screen',
  standalone: true,
  imports: [BreadcrumbsWithRouterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-screen.component.html',
  styleUrl: './basic-screen.component.scss'
})
export class BasicScreenComponent {
  title = input.required<string>();
  isHandset = input.required<boolean>();
}
