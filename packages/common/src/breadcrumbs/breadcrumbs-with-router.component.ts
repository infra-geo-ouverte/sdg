import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Optional,
  signal
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {
  BreakpointService,
  RouteTitleKey,
  SdgRoute,
  TitleResolver,
  resolveTitle
} from '@igo2/sdg-core';

import { Subject, takeUntil } from 'rxjs';

import { BreadcrumbsBase } from './breadcrumbs-base';
import { BreadcrumbsListComponent } from './breadcrumbs-list/breadcrumbs-list.component';
import { Breadcrumb, Breadcrumbs } from './shared/breadcrumbs.interface';

@Component({
  selector: 'sdg-breadcrumbs-with-router',
  imports: [RouterModule, BreadcrumbsListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sdg-breadcrumbs-list
      [breadcrumbs]="breadcrumbsList()"
      [isHandset]="isHandset()"
    />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  host: {
    '[class.d-none]': '!hasBreadcrumbs()'
  }
})
export class BreadcrumbsWithRouterComponent
  extends BreadcrumbsBase
  implements OnInit, OnDestroy
{
  breadcrumbs = signal<Breadcrumbs>([]);

  private _takeUntil = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Optional()
    private titleResolver: TitleResolver,
    breakpointService: BreakpointService
  ) {
    super(breakpointService);
  }

  ngOnInit(): void {
    const breads = this.getBreadsFromRouterSegments();
    this.breadcrumbs.set(breads);

    this.router.events.pipe(takeUntil(this._takeUntil)).subscribe(() => {
      const breads = this.getBreadsFromRouterSegments();
      this.breadcrumbs.set(breads);
    });
  }

  ngOnDestroy(): void {
    this._takeUntil.next(true);
  }

  private getHomeRoute(): SdgRoute | undefined {
    return this.router.config.find((route: SdgRoute) => route.isHome);
  }

  private getBreadsFromRouterSegments(): Breadcrumbs {
    const routes = this.getRouterBreadcrumbs();
    if (!routes.length) {
      return [];
    }

    const home = this.getHomeRoute();
    if (!home) {
      throw new Error(
        'We need at least one home to construct the breadcrumbs list. You need to setup a route with the isHome property at true'
      );
    }
    /**
     * Si on est sur la route du parent "", on n'affiche aucune route?
     * @todo Cette logique est à discuté et analysé pour voir comment gérer ce comportement et
     * sur une stratégie pour gérer cette configuration. Par exemple le système gouvernemental met
     * le libellé "Accueil" avec une redirection vers la route "a-propos"
     */
    if (routeEqualHome(routes[0], home)) {
      return [];
    }

    /**
     * @todo Gérer les title de route, le type peut être asynchrone comment gérer ça?
     * On pourrait diverger du type de @angular/router et forcer un string?
     */
    const title = resolveTitle(home, this.titleResolver) ?? '';
    const url = home.path ?? '';
    routes.unshift({
      id: `${title}-${url}`,
      title,
      url
    });

    return routes;
  }

  private getRouterBreadcrumbs(): Breadcrumbs {
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
      const title = route.snapshot.title ?? '';
      const url = `${lastUrl}/${route.snapshot.url.toString()}`;
      const breadcrumb: Breadcrumb = {
        id: `${title}-${url}`,
        title,
        url
      };

      if (breadcrumbs.some((crumb) => crumb.title === breadcrumb.title)) {
        return breadcrumbs;
      }

      return breadcrumbs.concat(breadcrumb);
    }, [] as Breadcrumbs);
  }
}

function routeEqualHome(route: SdgRoute, home: SdgRoute | undefined): boolean {
  if (!home) {
    return false;
  }

  return (
    route.title === home.title || route.title === home.data?.[RouteTitleKey]
  );
}
