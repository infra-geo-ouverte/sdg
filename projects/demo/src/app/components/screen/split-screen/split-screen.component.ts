import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbsWithRouterComponent } from '@igo2/sdg';

@Component({
  selector: 'app-split-screen',
  imports: [BreadcrumbsWithRouterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './split-screen.component.html',
  styleUrl: './split-screen.component.scss'
})
export class SplitScreenComponent {
  readonly title = input<string>();
  readonly isHandset = input.required<boolean>();
}
