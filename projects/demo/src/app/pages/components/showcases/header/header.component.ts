import { Component, WritableSignal } from '@angular/core';

import { ExternalLinkComponent, HeaderComponent } from '@igo2/sdg-common';
import { Language, TranslationService } from '@igo2/sdg-i18n';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';
import { environment } from 'projects/demo/src/environments/environment';
import { EnvironmentOptions } from 'projects/demo/src/environments/environment.interface';

@Component({
  selector: 'app-header',
  imports: [ExampleViewerComponent, ExternalLinkComponent, HeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderDemoComponent {
  config: EnvironmentOptions = environment;

  constructor(private translationService: TranslationService) {}

  get currentLanguage(): WritableSignal<Language> {
    return this.translationService.lang;
  }

  handleLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang as Language);
  }
}
