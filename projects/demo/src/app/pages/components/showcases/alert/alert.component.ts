import { Component, Signal } from '@angular/core';

import { AlertComponent } from '@igo2/sdg';
import { BreakpointService } from '@igo2/sdg/core';

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
  generalAlertIsOpen = true;
  alertIsOpen = true;

  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
