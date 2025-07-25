import { Component } from '@angular/core';

import { CharterBannerComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-button',
  imports: [ExampleViewerComponent, CharterBannerComponent],
  templateUrl: './charter-banner.component.html',
  styleUrl: './charter-banner.component.scss'
})
export class CharterBannerDemoComponent {}
