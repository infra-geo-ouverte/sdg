import { Component } from '@angular/core';

import {
  ExternalLinkComponent,
  SeeAlsoComponent,
  SeeAlsoLinks
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-see-also',
  imports: [ExampleViewerComponent, ExternalLinkComponent, SeeAlsoComponent],
  templateUrl: './see-also.component.html',
  styleUrl: './see-also.component.scss'
})
export class SeeAlsoDemoComponent {
  links: SeeAlsoLinks = [
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
