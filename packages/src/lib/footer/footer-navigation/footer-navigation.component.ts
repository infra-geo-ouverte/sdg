import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterNavLogo, SiteMapLinks } from '../footer.interface';

@Component({
  selector: 'sdg-footer-navigation',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-navigation.component.html',
  styleUrls: ['./footer-navigation.component.scss']
})
export class FooterNavigationComponent {
  title = input<string>();
  logo = input<FooterNavLogo>();
  siteMapLinks = input<SiteMapLinks>();
  readonly containerClass = input<string>();
}
