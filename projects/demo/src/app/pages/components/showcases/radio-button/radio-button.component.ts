import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-radio-button',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonDemoComponent {
  checked = signal(false);
  checkedCompact = signal(false);
  disabled = signal(false);
  disabledCompact = signal(false);
}
