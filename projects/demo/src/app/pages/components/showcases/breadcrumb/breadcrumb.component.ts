import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbsComponent } from '@igo2/sdg';

import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [ExampleViewerComponent, BreadcrumbsComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [
    {
      title: 'first',
      url: 'first'
    },
    {
      title: 'two',
      url: 'two'
    },
    {
      title: 'three',
      url: 'three'
    },
    {
      title: 'four',
      url: 'four'
    },
    {
      title: 'fifth',
      url: 'fifth'
    },
    {
      title: 'six',
      url: 'six'
    }
  ];
}
