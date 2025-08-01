import { Component, WritableSignal } from '@angular/core';

import { ExternalLinkComponent, HeaderComponent } from '@igo2/sdg-common';
import { Language } from '@igo2/sdg-core';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';
import { AppTranslationService } from 'projects/demo/src/app/config/translation/translation.service';
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

  constructor(private translationService: AppTranslationService) {}

  get currentLanguage(): WritableSignal<Language> {
    return this.translationService.lang;
  }

  handleLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang as Language);
  }
}
