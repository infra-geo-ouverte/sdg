import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  computed,
  input,
  model
} from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';

import { IgoLanguageModule } from '@igo2/core/language';

import { BreadcrumbItemComponent } from '../breadcrumb-item/breadcrumb-item.component';
import { BreadcrumbMenuComponent } from '../breadcrumb-menu/breadcrumb-menu.component';
import {
  AnyBreadcrumb,
  Breadcrumb,
  BreadcrumbMenu
} from '../shared/breadcrumb.interface';

@Component({
  selector: 'sdg-breadcrumbs',
  standalone: true,
  imports: [
    BreadcrumbItemComponent,
    BreadcrumbMenuComponent,
    RouterModule,
    IgoLanguageModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs = model<Breadcrumb[]>([]);
  isHandset = input(false);
  /** Analyze @angular/router hierarchy to determine the breadcrumbs  */
  withRouter = input(false);

  breadcrumbsList = this.getBreadcrumbs();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.withRouter()) {
      const breads = this.handleRouterSegments();
      this.breadcrumbs.set(breads);
    }
  }

  isMenu(breadcrumb: AnyBreadcrumb): breadcrumb is BreadcrumbMenu {
    return !!(breadcrumb as BreadcrumbMenu)?.menu;
  }

  private getHomeRoute(): Route | undefined {
    return this.router.config
      .filter((route) => route.redirectTo == null)
      .find((route) => route.path === '');
  }

  private getBreadcrumbs(): Signal<(AnyBreadcrumb | undefined)[]> {
    return computed(() => {
      const breads = this.breadcrumbs();

      if (this.isHandset()) {
        return breads.length > 1 ? [breads.at(-2)] : [];
      } else if (breads.length >= 5) {
        const menu: BreadcrumbMenu = {
          menu: breads.slice(2, -2)
        };
        return [...breads.slice(0, 2), menu, ...breads.slice(-2)];
      } else {
        return breads;
      }
    });
  }

  private handleRouterSegments(): Breadcrumb[] {
    const routes = this.getRouterBreadcrumbs();
    /**
     * Si on est sur la route du parent "", on n'affiche aucune route?
     * @todo Cette logique est à discuté et analysé pour voir comment gérer ce comportement et
     * sur une stratégie pour gérer cette configuration. Par exemple le système gouvernemental met
     * le libellé "Accueil" avec une redirection vers la route "a-propos"
     */
    const home = this.getHomeRoute();
    if (routes.length && routes[0].title === home?.title) {
      return [];
    }

    if (home) {
      /**
       * @todo Gérer les title de route, le type peut être asynchrone comment gérer ça?
       * On pourrait diverger du type de @angular/router et forcer un string?
       */
      routes.unshift({
        title: home.title as string,
        url: home.path ?? ''
      });
    }

    return routes;
  }

  private getRouterBreadcrumbs(): Breadcrumb[] {
    const routes = this.activatedRoute.pathFromRoot
      .filter(
        (route) =>
          route.children.length &&
          !(
            route.children[0]?.component != null &&
            route.children[0]?.children.length
          )
      )
      .map((route) => route.children[0]);

    return routes.reduce((breadcrumbs, route) => {
      const lastUrl = breadcrumbs.at(-1)?.url ?? '';
      const breadcrumb: Breadcrumb = {
        title: route.snapshot.title ?? '',
        url: `${lastUrl}/${route.snapshot.url.toString()}`
      };

      if (breadcrumbs.some((crumb) => crumb.title === breadcrumb.title)) {
        return breadcrumbs;
      }

      return breadcrumbs.concat(breadcrumb);
    }, [] as Breadcrumb[]);
  }
}
