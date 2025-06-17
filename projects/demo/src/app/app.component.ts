import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { IgoLanguageModule } from '@igo2/core/language';
import {
  FooterComponent,
  HeaderComponent,
  IHeaderContactUs,
  INavigationLinks,
  NavigationComponent,
  SiteMapLink,
  SiteMapLinks,
  TopPageButtonComponent,
  isNavigationLink
} from '@igo2/sdg-common';
import {
  Language,
  SdgRoute,
  TitleResolverPipe,
  TranslationService,
  resolveTitle
} from '@igo2/sdg-core';
import { DomUtils } from '@igo2/utils';

import { delay, first } from 'rxjs';

import { environment } from '../environments/environment';
import { EnvironmentOptions } from '../environments/environment.interface';
import { routes } from './app.routes';
import { AppTitleResolver } from './config/title-resolver';

@Component({
  selector: 'app-root',
  imports: [
    NavigationComponent,
    HeaderComponent,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    IgoLanguageModule,
    FooterComponent,
    TopPageButtonComponent
  ],
  providers: [TitleResolverPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  config: EnvironmentOptions = environment;
  contactUs: IHeaderContactUs | undefined;
  links: INavigationLinks;
  siteMapLinks: SiteMapLinks;

  copyright = this.config.footer.copyright;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private translationService: TranslationService,
    private titleResolver: AppTitleResolver,
    private titleResolverPipe: TitleResolverPipe
  ) {
    const contactUsOptions = environment.header.contactUs;
    if (contactUsOptions) {
      this.contactUs = {
        label: this.translationService.get(contactUsOptions.label),
        route: `${this.currentLanguage()}/${contactUsOptions.route}`
      };
    }

    this.validateUrlLanguage();

    this.links = this.getLinks();
    this.siteMapLinks = this.getSiteMapLinks();
  }

  get currentLanguage() {
    return this.translationService.lang;
  }

  ngOnInit(): void {
    this.handleSplashScreen();
  }

  handleLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang as Language);
  }

  private getLinks(): INavigationLinks {
    const lang = this.translationService.lang();
    return [...routes[0].children!]
      .filter((route) => !route.hidden)
      .reduce((links, route, index) => {
        if (!isNavigationLink(route)) {
          return links;
        }

        const title = resolveTitle(route, this.titleResolver);
        if (!title) {
          throw new Error(`Title not found for route ${index}`);
        }

        return links.concat({
          ...route,
          title: title,
          path: route.path ? `/${lang}/${route.path}` : `/${lang}`
        });
      }, [] as INavigationLinks);
  }

  private getSiteMapLinks(): SiteMapLinks {
    const lang = this.translationService.lang();
    return [...routes[0].children!]
      .filter((route) => isSiteMapLink(route))
      .map((route, siteMapLinkIndex) => {
        const title = this.titleResolverPipe.transform(route);
        if (!title) {
          throw new Error(
            `Title not found for site map link ${siteMapLinkIndex}`
          );
        }
        return {
          ...route,
          title: title,
          path: route.path ? `/${lang}/${route.path}` : `/${lang}`
        };
      });
  }

  private handleSplashScreen(): void {
    this.router.events
      .pipe(
        first((events) => events instanceof NavigationEnd),
        delay(300)
      )
      .subscribe(() => {
        this._removeSplashScreen();
      });
  }

  private _removeSplashScreen(): void {
    const intro = this.document.getElementById('splash-screen');
    if (!intro) {
      return;
    }
    intro.classList.add('is-destroying');

    const destroyingAnimationTime = 300;
    const stylesheet = this.document.getElementById('splash-screen-stylesheet');

    setTimeout(() => {
      DomUtils.remove(intro);
      if (stylesheet) {
        DomUtils.remove(stylesheet);
      }
    }, destroyingAnimationTime);
  }

  private validateUrlLanguage(): void {
    const urlLang = getUrlLang(this.document);
    if (!urlLang) {
      this.router.navigate(['/']);
    }
  }
}

function isSiteMapLink(route: SdgRoute): route is SiteMapLink {
  return !!(route.title && route.path && !route.redirectTo);
}

function getUrlLang(document: Document): Language | undefined {
  const url = new URL(document.location.href);
  const urlLang = url.pathname.split('/').filter(Boolean)[0];

  if (['fr', 'en'].includes(urlLang as Language)) {
    return urlLang as Language;
  }

  return;
}
