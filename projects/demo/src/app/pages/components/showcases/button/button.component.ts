import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ExampleViewerComponent, MatButton, ExternalLinkComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {}
