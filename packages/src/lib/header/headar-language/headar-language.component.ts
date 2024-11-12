import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { IHeaderLanguage, IHeaderLanguageChoice } from '../header.interface';

@Component({
  selector: 'sdg-headar-language',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './headar-language.component.html',
  styleUrl: './headar-language.component.scss'
})
export class HeadarLanguageComponent {
  options = input.required<IHeaderLanguage>();
  language = input<string>();

  languageChange = output<string>();

  get nextLang(): IHeaderLanguageChoice | undefined {
    // For now we have only two language
    return this.options().choices.find((lang) => lang.key !== this.language());
  }

  change(lang: string): void {
    this.languageChange.emit(lang);
  }
}
