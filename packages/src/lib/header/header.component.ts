import { Component, Signal, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { BreakpointService, Language } from '@igo2/sdg/core';

import {
  IHeaderContactUs,
  IHeaderLanguageChoice,
  IHeaderLanguages
} from './header.interface';

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, MatButtonModule, MatIconModule]
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly contactUs = input<IHeaderContactUs>();
  readonly languages = input<IHeaderLanguages>();
  readonly currentLanguage = input<IHeaderLanguageChoice['key']>();
  readonly containerClass = input<string>();

  languageChange = output<string>();

  isHandset: Signal<boolean>;

  constructor(private breakpointService: BreakpointService) {
    this.isHandset = this.breakpointService.isHandset;
  }

  get nextLanguage(): IHeaderLanguageChoice | undefined {
    // For now we have only two language
    return this.languages()?.choices.find(
      (language) => language.key !== this.currentLanguage()
    );
  }

  changeLanguage(language: Language): void {
    this.languageChange.emit(language);
  }
}
