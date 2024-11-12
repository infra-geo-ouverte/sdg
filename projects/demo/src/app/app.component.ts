import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { IgoLanguageModule } from '@igo2/core/language';
import {
  HeadarLanguageComponent,
  HeaderComponent,
  NavigationComponent
} from '@igo2/sdg';
import { Language, TranslationService } from '@igo2/sdg/core';
import { DomUtils } from '@igo2/utils';

import { delay, first } from 'rxjs';

import { environment } from '../environments/environment';
import { EnvironmentOptions } from '../environments/environnement.interface';
import { routes } from './app.routes';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    HeaderComponent,
    HeadarLanguageComponent,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    IgoLanguageModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  config: EnvironmentOptions = environment;
  routes = routes.filter((route) => route.redirectTo == null);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private appService: AppService,
    private translationService: TranslationService
  ) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }

  get language() {
    return this.translationService.lang;
  }

  ngOnInit(): void {
    this.handleSplashScreen();
  }

  handleLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang as Language);
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
}
