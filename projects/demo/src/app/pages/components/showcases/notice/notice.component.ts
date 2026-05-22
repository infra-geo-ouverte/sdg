import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ExternalLinkComponent, NoticeComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-notice',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    NoticeComponent,
    RouterLink
  ],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeDemoComponent {
  message =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}
