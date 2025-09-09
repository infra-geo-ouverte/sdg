import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  WritableSignal,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import {
  FooterComponent,
  HeaderComponent,
  INavigationLinks,
  NavigationComponent,
  SiteMapLink,
  SiteMapLinks,
  TopPageButtonComponent,
  isNavigationLink
} from '@igo2/sdg-common';
import { SdgRoute, TitleResolverPipe, resolveTitle } from '@igo2/sdg-core';
import { Language, TranslationPipe, TranslationService } from '@igo2/sdg-i18n';

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
    MatMenuModule,
    MatSlideToggleModule,
    FooterComponent,
    TopPageButtonComponent,
    TranslationPipe
  ],
  providers: [TitleResolverPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  config: EnvironmentOptions = environment;
  contactUsRoute: string | undefined;
  links: INavigationLinks;
  siteMapLinks: SiteMapLinks;

  isDarkMode = signal(false);

  copyright = this.config.footer.copyright;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private translationService: TranslationService,
    private titleResolver: AppTitleResolver,
    private titleResolverPipe: TitleResolverPipe
  ) {
    const contactUsRoute = environment.header.contactUsRoute;
    if (contactUsRoute) {
      this.contactUsRoute = `${this.currentLanguage()}/${contactUsRoute}`;
    }

    this.validateUrlLanguage();

    this.links = this.getLinks();
    this.siteMapLinks = this.getSiteMapLinks();
  }

  get currentLanguage(): WritableSignal<Language> {
    return this.translationService.lang;
  }

  ngOnInit(): void {
    this.handleSplashScreen();
  }

  handleLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang as Language);
  }

  toggleTheme(): void {
    const isDark = this.isDarkMode();

    this.document.body.classList[isDark ? 'remove' : 'add']('dark-mode');
    this.document.documentElement.style.setProperty(
      'color-scheme',
      isDark ? 'light' : 'dark'
    );

    this.isDarkMode.update((value) => !value);
  }

  private getLinks(): INavigationLinks {
    const lang = this.currentLanguage();
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
    const lang = this.currentLanguage();
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
      intro.parentNode?.removeChild(intro);
      if (stylesheet) {
        stylesheet.parentNode?.removeChild(stylesheet);
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
