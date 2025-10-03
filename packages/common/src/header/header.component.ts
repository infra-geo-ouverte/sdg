import { Component, InjectionToken, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { WithLabels } from '@igo2/sdg-core';

import {
  IHeaderLabels,
  IHeaderLanguageChoice,
  IHeaderLanguages
} from './header.interface';

export const SDG_HEADER_LABELS = new InjectionToken<IHeaderLabels>(
  'SDG_HEADER_LABELS'
);

const DEFAULT_LABELS: IHeaderLabels = { contactUs: 'Nous joindre' };

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, MatButtonModule, MatIconModule]
})
export class HeaderComponent extends WithLabels<IHeaderLabels> {
  readonly title = input.required<string>();
  readonly contactUsRoute = input<string>();
  readonly languages = input<IHeaderLanguages>();
  readonly currentLanguage = input<string>();
  readonly containerClass = input.required<string>();

  languageChange = output<string>();

  constructor() {
    super(DEFAULT_LABELS, SDG_HEADER_LABELS);
  }

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
