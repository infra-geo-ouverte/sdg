import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-slide-toggle',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss'
})
export class SlideToggleDemoComponent {
  disabled = signal(false);
}
