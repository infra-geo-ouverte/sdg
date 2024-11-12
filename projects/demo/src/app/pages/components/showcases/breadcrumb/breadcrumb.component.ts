import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbsComponent } from '@igo2/sdg';

import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    ExampleViewerComponent,
    BreadcrumbsComponent,
    ExternalLinkComponent
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbDemoComponent {
  breadcrumbs: Breadcrumb[] = [
    {
      id: '0',
      title: 'premier',
      url: 'premier'
    },
    {
      id: '1',
      title: 'deuxième',
      url: 'deuxième'
    },
    {
      id: '2',
      title: 'troisième',
      url: 'troisième'
    },
    {
      id: '3',
      title: 'quatrième',
      url: 'quatrième'
    },
    {
      id: '4',
      title: 'cinquième',
      url: 'cinquième'
    },
    {
      id: '5',
      title: 'sixième',
      url: 'sixième'
    }
  ];
}
