import { Component } from '@angular/core';

import { SequentialLink, SequentialLinksComponent } from '@igo2/sdg-common';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

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
}
