import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SiteMapLinks } from '../footer.interface';

@Component({
  selector: 'sdg-footer-links',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.scss']
})
export class FooterLinksComponent {
  externalLinks = input<SiteMapLinks>();
  readonly containerClass = input<string>();
}
