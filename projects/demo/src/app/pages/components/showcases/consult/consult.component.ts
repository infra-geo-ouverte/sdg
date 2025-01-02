import { Component, Signal } from '@angular/core';

import { ConsultComponent, ConsultLinks } from '@igo2/sdg';

import { AppService } from '../../../../app.service';
import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-consult',
  standalone: true,
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

  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
