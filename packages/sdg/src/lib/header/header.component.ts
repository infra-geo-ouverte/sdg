import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IgoLanguageModule, LanguageService } from '@igo2/core/language';

import {
  IHeaderContactUs,
  IHeaderLanguage,
  IHeaderLanguageChoice,
  IHeaderLogo,
  IHeaderOptions
} from './header.interface';

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, IgoLanguageModule]
})
export class HeaderComponent {
  logo = input.required<IHeaderLogo>();
  title = input.required<string>();
  options = input<IHeaderOptions>();

  currentLanguage = signal('fr');

  get contactUs(): IHeaderContactUs | undefined {
    return this.options()?.contactUs;
  }

  get language(): IHeaderLanguage | undefined {
    return this.options()?.language;
  }

  get nextLang(): IHeaderLanguageChoice | undefined {
    return this.options()?.language?.choices.find(
      (lang) => lang.key !== this.currentLanguage()
    );
  }

  constructor(private languageService: LanguageService) {}

  changeLanguage(lang: string): void {
    this.currentLanguage.set(lang);
    this.languageService.setLanguage(lang);
  }
}
