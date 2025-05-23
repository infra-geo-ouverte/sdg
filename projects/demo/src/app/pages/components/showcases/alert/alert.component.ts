import { Component } from '@angular/core';

import { AlertComponent } from '@igo2/sdg-common';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-alert',
  imports: [ExampleViewerComponent, ExternalLinkComponent, AlertComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertDemoComponent {
  generalAlertIsOpened = true;
  alertIsOpened = true;
}
