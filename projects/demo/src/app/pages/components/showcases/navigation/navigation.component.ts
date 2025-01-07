import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { INavigationLinks, NavigationComponent } from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    NavigationComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationDemoComponent {
  mockLinks: INavigationLinks = [
    { title: 'Link 1', path: '/link1' },
    { title: 'Link 2', path: '/link2' },
    { title: 'Link 3', path: '/link3' },
    { title: 'Link 4', path: '/link4' }
  ];

  mockLinksForOverflow: INavigationLinks = [
    { title: 'Link 1', path: '/link1' },
    { title: 'Link 2', path: '/link2' },
    { title: 'Link 3', path: '/link3' },
    { title: 'Link 4', path: '/link4' },
    { title: 'Link 5', path: '/link5' },
    { title: 'Link 6', path: '/link6' },
    { title: 'Link 7', path: '/link7' },
    { title: 'Link 8', path: '/link8' },
    { title: 'Link 9', path: '/link9' },
    { title: 'Link 10', path: '/link10' },
    { title: 'Link 11', path: '/link11' },
    { title: 'Link 12', path: '/link12' },
    { title: 'Link 13', path: '/link13' },
    { title: 'Link 14', path: '/link14' },
    { title: 'Link 15', path: '/link15' },
    { title: 'Link 16', path: '/link16' },
    { title: 'Link 17', path: '/link17' }
  ];
}
