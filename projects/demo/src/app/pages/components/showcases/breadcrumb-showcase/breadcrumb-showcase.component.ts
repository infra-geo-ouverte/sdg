import { Component } from '@angular/core';

import { BreadcrumbsComponent } from '@igo2/sdg';

import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';

@Component({
  selector: 'app-breadcrumb-showcase',
  standalone: true,
  imports: [ExampleViewerComponent, BreadcrumbsComponent],
  templateUrl: './breadcrumb-showcase.component.html',
  styleUrl: './breadcrumb-showcase.component.scss'
})
export class BreadcrumbShowcaseComponent {}
