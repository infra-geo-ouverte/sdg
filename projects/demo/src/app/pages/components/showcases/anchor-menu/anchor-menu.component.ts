import { Component, Signal } from '@angular/core';

import { AnchorMenuComponent } from '@igo2/sdg';

import { AppService } from '../../../../app.service';
import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-anchor-menu',
  standalone: true,
  imports: [ExampleViewerComponent, AnchorMenuComponent, ExternalLinkComponent],
  templateUrl: './anchor-menu.component.html',
  styleUrl: './anchor-menu.component.scss'
})
export class AnchorMenuDemoComponent {
  constructor(private appService: AppService) {}

  anchors = [
    {
      text: 'Section 1',
      htmlElementId: 'section1'
    },
    {
      text: 'Section 2',
      htmlElementId: 'section2'
    },
    {
      text: 'Section 3',
      htmlElementId: 'section3'
    }
  ];

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
