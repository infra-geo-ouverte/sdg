import { Component, Signal } from '@angular/core';

import { SequentialLink, SequentialLinksComponent } from '@igo2/sdg';

import { AppService } from '../../../../app.service';
import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

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
  constructor(private appService: AppService) {}

  previous: SequentialLink = {
    text: "Fil d'Ariane",
    url: 'fil-ariane'
  };

  next: SequentialLink = {
    text: 'Tuile',
    url: 'tuile'
  };

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
