import { Component } from '@angular/core';

import {
  ConsultComponent,
  ConsultLinks,
  ExternalLinkComponent
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-consult',
  imports: [ExampleViewerComponent, ExternalLinkComponent, ConsultComponent],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultDemoComponent {
  links: ConsultLinks = [
    {
      label: "Page d'accueil",
      url: '/'
    },
    {
      label: 'Composants',
      url: '/composants'
    },
    {
      label: 'Alerte',
      url: '/composants/showcases/alerte'
    }
  ];
}
