import { Component } from '@angular/core';

import {
  ButtonComponent,
  ButtonFlatComponent,
  ButtonRaisedComponent,
  ButtonStrokedComponent
} from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-button',
  standalone: true,
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
