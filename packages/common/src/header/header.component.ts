import {
  Component,
  InjectionToken,
  Signal,
  inject,
  input,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { BreakpointService, Language } from '@igo2/sdg-core';

import { IHeaderLanguageChoice, IHeaderLanguages } from './header.interface';

export const SDG_HEADER_LABELS = new InjectionToken<string>(
  'SDG_HEADER_LABELS'
);

const CONTACT_US = 'Nous joindre';

@Component({
  selector: 'sdg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, MatButtonModule, MatIconModule]
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly contactUsRoute = input<string>();
  readonly languages = input<IHeaderLanguages>();
  readonly currentLanguage = input<IHeaderLanguageChoice['key']>();
  readonly containerClass = input.required<string>();

  languageChange = output<string>();

  isHandset: Signal<boolean>;

  contactUs = CONTACT_US;

  constructor(private breakpointService: BreakpointService) {
    this.isHandset = this.breakpointService.isHandset;

    const labelsOverride = inject(SDG_HEADER_LABELS);
    if (labelsOverride) {
      this.contactUs = labelsOverride;
    }
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
