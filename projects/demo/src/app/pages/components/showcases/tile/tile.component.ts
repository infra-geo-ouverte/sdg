import { Component } from '@angular/core';

import { ExternalLinkComponent, TileComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-tile',
  imports: [ExampleViewerComponent, ExternalLinkComponent, TileComponent],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileDemoComponent {
  longMessage =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  shortMessage =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}
