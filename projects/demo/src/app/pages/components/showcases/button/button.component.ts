import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-button',
  imports: [ExampleViewerComponent, ExternalLinkComponent, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonDemoComponent {
  handleClick() {
    alert('Button clicked!');
  }
}
