import { Component, WritableSignal, inject } from '@angular/core';

import { ExternalLinkComponent, HeaderComponent } from '@igo2/sdg-common';
import { Language, TranslationService } from '@igo2/sdg-i18n';

import { environment } from '../../../../../environments/environment';
import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-header',
  imports: [ExampleViewerComponent, ExternalLinkComponent, HeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderDemoComponent {
  private translationService = inject(TranslationService);

  config = environment;

  get currentLanguage(): WritableSignal<Language> {
    return this.translationService.lang;
  }

  handleLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang as Language);
  }
}
