import { Component, Signal } from '@angular/core';

import { NoticeComponent, SequentialLink } from '@igo2/sdg';

import { SequentialLinksComponent } from '../../../../../../../../packages/sdg/src/lib/sequential-links/sequential-links.component';
import { AppService } from '../../../../app.service';
import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-sequential-links',
  standalone: true,
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    NoticeComponent,
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
