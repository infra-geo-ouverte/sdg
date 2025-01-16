import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbsWithRouterComponent } from '@igo2/sdg';

@Component({
  selector: 'app-basic-screen',
  standalone: true,
  imports: [BreadcrumbsWithRouterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-screen.component.html',
  styleUrl: './basic-screen.component.scss'
})
export class BasicScreenComponent {
  readonly title = input.required<string>();
  readonly isHandset = input.required<boolean>();
}
