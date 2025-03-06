import { Component } from '@angular/core';

import {
  FooterComponent,
  FooterCopyright,
  FooterNavLogo,
  SiteMapLinks
} from '@igo2/sdg';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';
import { environment } from 'projects/demo/src/environments/environment';
import { EnvironmentOptions } from 'projects/demo/src/environments/environment.interface';

@Component({
  selector: 'app-footer',
  imports: [ExampleViewerComponent, FooterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterDemoComponent {
  config: EnvironmentOptions = environment;

  title: string = this.config.title;
  logo: FooterNavLogo = { url: 'images/signature-PIV.svg', height: 50 };
  siteMapLinks: SiteMapLinks = [
    { title: 'Composants', path: '/composants' },
    { title: 'Guides', path: '/guides' },
    { title: '...', path: '' }
  ];
  externalLinks: SiteMapLinks = [
    { title: 'Google', path: 'https://www.google.com/' },
    { title: 'Wikipedia', path: 'https://www.wikipedia.org/' }
  ];
  copyright: FooterCopyright = {
    logo: 'images/MSP.svg',
    logoUrl: 'https://www.quebec.ca',
    year: 2022
  };

  containerClass = 'container';
}
