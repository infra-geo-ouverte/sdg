import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-tabs',
  imports: [ExampleViewerComponent, ExternalLinkComponent, MatTabsModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsDemoComponent {}
