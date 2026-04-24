import { Component } from '@angular/core';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-external-link',
  imports: [ExampleViewerComponent, ExternalLinkComponent],
  templateUrl: './external-link.component.html',
  styleUrl: './external-link.component.scss'
})
export class ExternalLinkDemoComponent {}
