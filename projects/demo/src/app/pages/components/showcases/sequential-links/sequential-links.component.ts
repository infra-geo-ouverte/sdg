import { Component, Signal } from '@angular/core';

import { SequentialLink, SequentialLinksComponent } from '@igo2/sdg';
import { BreakpointService } from '@igo2/sdg/core';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

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

  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
