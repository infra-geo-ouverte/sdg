import { Component, Signal } from '@angular/core';

import { HeaderComponent } from '@igo2/sdg';
import { Language, TranslationService } from '@igo2/sdg/core';

import { AppService } from 'projects/demo/src/app/app.service';
import { ExampleViewerComponent } from 'projects/demo/src/app/components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from 'projects/demo/src/app/components/external-link/external-link.component';
import { environment } from 'projects/demo/src/environments/environment';
import { EnvironmentOptions } from 'projects/demo/src/environments/environment.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ExampleViewerComponent, ExternalLinkComponent, HeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderDemoComponent {
  config: EnvironmentOptions = environment;

  constructor(
    private appService: AppService,
    private translationService: TranslationService
  ) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }

  get currentLanguage() {
    return this.translationService.lang;
  }

  handleLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang as Language);
  }
}
