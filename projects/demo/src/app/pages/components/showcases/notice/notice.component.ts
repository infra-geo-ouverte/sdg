import { Component } from '@angular/core';

import { NoticeComponent } from '@igo2/sdg';

import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [ExampleViewerComponent, ExternalLinkComponent, NoticeComponent],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeDemoComponent {
  message: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}
