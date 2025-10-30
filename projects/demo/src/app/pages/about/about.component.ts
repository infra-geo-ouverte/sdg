import { Component } from '@angular/core';

import { ExternalLinkComponent } from '@igo2/sdg-common';

import { BasicScreenComponent } from '../../components';

@Component({
  selector: 'app-about',
  imports: [BasicScreenComponent, ExternalLinkComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {}
