import { Component, WritableSignal } from '@angular/core';

import {
  ExternalLinkComponent,
  SequentialLink,
  SequentialLinksComponent
} from '@igo2/sdg-common';
import { Language } from '@igo2/sdg-core';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';
import { AppTranslationService } from 'projects/demo/src/app/config/translation/translation.service';

@Component({
  selector: 'app-sequential-links',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    SequentialLinksComponent
  ],
  templateUrl: './sequential-links.component.html',
  styleUrl: './sequential-links.component.scss'
})
export class SequentialLinksDemoComponent {
  previous: SequentialLink = {
    text: "Fil d'Ariane",
    url: 'fil-ariane'
  };

  next: SequentialLink = {
    text: 'Tuile',
    url: 'tuile'
  };

  constructor(private translationService: AppTranslationService) {}

  get lang(): WritableSignal<Language> {
    return this.translationService.lang;
  }
}
