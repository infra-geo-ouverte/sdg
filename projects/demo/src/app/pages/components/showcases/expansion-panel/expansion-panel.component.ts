import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-expansion-panel',
  imports: [ExampleViewerComponent, ExternalLinkComponent, MatExpansionModule],
  templateUrl: './expansion-panel.component.html'
})
export class ExpansionPanelDemoComponent {}
