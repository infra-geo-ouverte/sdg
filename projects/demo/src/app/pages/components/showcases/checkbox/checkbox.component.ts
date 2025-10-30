import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-checkbox',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxDemoComponent {
  checked1 = signal(false);
  checked2 = signal(false);
  checkedCompact1 = signal(false);
  checkedCompact2 = signal(false);
  disabled1 = signal(false);
  disabled2 = signal(false);
  disabledCompact1 = signal(false);
  disabledCompact2 = signal(false);
}
