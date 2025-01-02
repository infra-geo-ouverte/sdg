import { Component, Signal } from '@angular/core';

import { AlertComponent } from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

import { AppService } from '../../../../app.service';

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

  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
