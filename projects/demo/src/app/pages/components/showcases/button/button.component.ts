import { Component } from '@angular/core';

import {
  ButtonComponent,
  ButtonFlatComponent,
  ButtonRaisedComponent,
  ButtonStrokedComponent,
  ExternalLinkComponent
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-button',
  imports: [
    ExampleViewerComponent,
    ButtonComponent,
    ButtonStrokedComponent,
    ButtonRaisedComponent,
    ButtonFlatComponent,
    ExternalLinkComponent
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonDemoComponent {
  handleClick() {
    alert('Button clicked!');
  }
}
