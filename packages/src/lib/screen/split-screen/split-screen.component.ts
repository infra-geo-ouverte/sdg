import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbsWithRouterComponent } from '../../breadcrumb/breadcrumbs-with-router.component';

@Component({
  selector: 'sdg-split-screen',
  standalone: true,
  imports: [BreadcrumbsWithRouterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './split-screen.component.html',
  styleUrl: './split-screen.component.scss'
})
export class SplitScreenComponent {
  title = input<string>();
  isHandset = input.required<boolean>();
}
