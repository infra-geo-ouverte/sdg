import { Component } from '@angular/core';

import {
  Breadcrumbs,
  BreadcrumbsComponent,
  BreadcrumbsWithRouterComponent
} from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
    ExampleViewerComponent,
    BreadcrumbsComponent,
    ExternalLinkComponent,
    BreadcrumbsWithRouterComponent
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsDemoComponent {
  breadcrumbs: Breadcrumbs = [
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
