import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BasicScreenComponent, INavigationRoutes } from '@igo2/sdg';

import { AppService } from '../../app.service';
import { routes } from './showcases/showcases.routes';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [BasicScreenComponent, RouterLink],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {
  routes: INavigationRoutes = routes.filter(
    (route) => route.redirectTo == null
  );

  constructor(private appService: AppService) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
