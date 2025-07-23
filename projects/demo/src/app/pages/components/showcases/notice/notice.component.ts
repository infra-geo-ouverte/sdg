import { Component } from '@angular/core';

import { ExternalLinkComponent, NoticeComponent } from '@igo2/sdg-common';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-notice',
  imports: [ExampleViewerComponent, ExternalLinkComponent, NoticeComponent],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeDemoComponent {
  message =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}
