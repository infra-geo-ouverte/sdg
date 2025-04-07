import { Component } from '@angular/core';

import { TopPageButtonComponent } from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-top-page-button',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    TopPageButtonComponent
  ],
  templateUrl: './top-page-button.component.html',
  styleUrl: './top-page-button.component.scss'
})
export class TopPageButtonDemoComponent {}
