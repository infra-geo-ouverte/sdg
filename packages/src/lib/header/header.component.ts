import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import {
  IHeaderContactUs,
  IHeaderLanguageChoice,
  IHeaderLanguages
} from './header.interface';

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule]
})
export class HeaderComponent {
  title = input.required<string>();
  contactUs = input<IHeaderContactUs>();
  languages = input<IHeaderLanguages>();
  currentLanguage = input<string>();
  isHandset = input.required<boolean>();

  languageChange = output<string>();

  showSearch = false;

  get nextLanguage(): IHeaderLanguageChoice | undefined {
    // For now we have only two language
    return this.languages()?.choices.find(
      (language) => language.key !== this.currentLanguage()
    );
  }

  changeLanguage(language: string): void {
    this.languageChange.emit(language);
  }
}
