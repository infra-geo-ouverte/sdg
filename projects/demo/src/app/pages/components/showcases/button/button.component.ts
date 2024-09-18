import { Component } from '@angular/core';

import {
  ButtonComponent,
  ButtonFlatComponent,
  ButtonRaisedComponent,
  ButtonStrokedComponent
} from '@igo2/sdg';

import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

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
