import { Component, Signal } from '@angular/core';

import { TileComponent } from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-tile',
  standalone: true,
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

  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
