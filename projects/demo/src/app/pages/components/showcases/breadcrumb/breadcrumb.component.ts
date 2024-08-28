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
      title: 'premier',
      url: 'premier'
    },
    {
      title: 'deuxième',
      url: 'deuxième'
    },
    {
      title: 'troisième',
      url: 'troisième'
    },
    {
      title: 'quatrième',
      url: 'quatrième'
    },
    {
      title: 'cinquième',
      url: 'cinquième'
    },
    {
      title: 'sixième',
      url: 'sixième'
    }
  ];
}
