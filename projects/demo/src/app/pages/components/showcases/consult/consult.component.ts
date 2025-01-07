import { Component, Signal } from '@angular/core';

import { ConsultComponent, Link } from '@igo2/sdg';
import { BreakpointService } from '@igo2/sdg/core';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

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

  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
