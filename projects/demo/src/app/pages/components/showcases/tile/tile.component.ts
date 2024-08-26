import { Component, Signal } from '@angular/core';

import { TileComponent } from '@igo2/sdg';

import { AppService } from '../../../../app.service';
import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [ExampleViewerComponent, ExternalLinkComponent, TileComponent],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileDemoComponent {
  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }

  longMessage: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  shortMessage: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}
