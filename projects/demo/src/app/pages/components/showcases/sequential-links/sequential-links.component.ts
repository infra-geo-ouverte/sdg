import { Component, Signal } from '@angular/core';

import { SequentialLink, SequentialLinksComponent } from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-sequential-links',
  standalone: true,
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

  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
