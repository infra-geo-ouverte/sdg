import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { FooterCopyrightComponent } from './footer-copyright/footer-copyright.component';
import { FooterLinksComponent } from './footer-links/footer-links.component';
import { FooterNavigationComponent } from './footer-navigation/footer-navigation.component';
import {
  FooterCopyright,
  FooterNavLogo,
  SiteMapLinks
} from './footer.interface';

@Component({
  selector: 'sdg-footer',
  imports: [
    FooterNavigationComponent,
    FooterLinksComponent,
    FooterCopyrightComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly title = input<string>();
  readonly logo = input<FooterNavLogo>();
  readonly siteMapLinks = input<SiteMapLinks>();
  readonly externalLinks = input<SiteMapLinks>();
  readonly copyright = input.required<FooterCopyright>();
  readonly containerClass = input<string>('');
}
