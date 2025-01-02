import { Component, Signal } from '@angular/core';

import { AlertComponent } from '@igo2/sdg';
import { BreakpointService } from '@igo2/sdg/core';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ExampleViewerComponent, ExternalLinkComponent, AlertComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertDemoComponent {
  generalAlertIsOpened = true;
  alertIsOpened = true;

  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
