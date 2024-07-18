import { Component } from '@angular/core';

import { BreadcrumbsComponent } from '@igo2/sdg';

import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [ExampleViewerComponent, BreadcrumbsComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {}
