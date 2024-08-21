import { Component, Signal } from '@angular/core';

import { AlertComponent } from '@igo2/sdg';

import { AppService } from '../../../../app.service';
import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ExampleViewerComponent, ExternalLinkComponent, AlertComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertDemoComponent {
  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
