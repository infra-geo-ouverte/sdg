import { Component, Signal } from '@angular/core';

import { ConsultComponent, Link } from '@igo2/sdg';

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
  constructor(private appService: AppService) {}

  links: Link[] = [
    {
      text: "Page d'accueil",
      url: '/'
    },
    {
      text: 'Composantes',
      url: '/composantes'
    },
    {
      text: 'Alerte',
      url: '/composantes/showcases/alerte'
    }
  ];

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
