import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Language } from '@igo2/sdg-core';

import { FooterNavLogo, SiteMapLinks } from '../footer.interface';

@Component({
  selector: 'sdg-footer-navigation',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-navigation.component.html',
  styleUrls: ['./footer-navigation.component.scss']
})
export class FooterNavigationComponent {
  readonly title = input<string>();
  readonly logo = input<FooterNavLogo>();
  readonly siteMapLinks = input<SiteMapLinks>();
  readonly containerClass = input<string>();
  readonly currentLanguage = input<Language>();
}
