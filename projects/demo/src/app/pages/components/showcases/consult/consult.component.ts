import { Component, Signal } from '@angular/core';

import { ConsultComponent, Link } from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [ExampleViewerComponent, ExternalLinkComponent, ConsultComponent],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultDemoComponent {
  links: Link[] = [
    {
      text: "Page d'accueil",
      url: '/'
    },
    {
      text: 'Composants',
      url: '/composants'
    },
    {
      text: 'Alerte',
      url: '/composants/showcases/alerte'
    }
  ];

  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
