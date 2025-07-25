import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ExternalLinkComponent } from '../external-link';

@Component({
  selector: 'sdg-charter-banner',
  imports: [ExternalLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './charter-banner.component.html',
  styleUrls: ['./charter-banner.component.scss']
})
export class CharterBannerComponent {
  readonly containerClass = input.required<string>();
}
