import { Component, Signal } from '@angular/core';

import { LateralMenuComponent, LateralMenuSections } from '@igo2/sdg';
import { BreakpointService } from '@igo2/sdg/core';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-lateral-menu',
  standalone: true,
  imports: [ExampleViewerComponent, LateralMenuComponent],
  templateUrl: './lateral-menu.component.html',
  styleUrl: './lateral-menu.component.scss'
})
export class LateralMenuDemoComponent {
  menuTitle = 'Menu latéral';
  sections: LateralMenuSections = [
    {
      title: 'À propos',
      path: ''
    },
    {
      title: 'Composants',
      path: '/composants',
      items: [
        {
          title: 'À consulter aussi',
          path: '/composants/showcases/a-consulter-aussi'
        },
        {
          title: 'Alerte',
          path: '/composants/showcases/alerte'
        },
        {
          title: 'Menu latéral',
          path: '/composants/showcases/menu-lateral'
        }
      ]
    },
    {
      title: 'Guides',
      path: '/guides'
    }
  ];

  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
