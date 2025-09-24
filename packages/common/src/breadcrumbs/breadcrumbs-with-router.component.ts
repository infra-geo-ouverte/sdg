import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Optional,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule
} from '@angular/router';

import {
  BreakpointService,
  RouteTitleKey,
  SdgRoute,
  SdgRoutes,
  TitleResolver,
  resolveTitle
} from '@igo2/sdg-core';

import { Subject, filter, takeUntil } from 'rxjs';

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

    .d-none {
      display: none;
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

    this.router.events
      .pipe(
        filter((events) => events instanceof NavigationEnd),
        takeUntil(this._takeUntil)
      )
      .subscribe(() => {
        const breads = this.getBreadsFromRouterSegments();
        this.breadcrumbs.set(breads);
      });
  }

  ngOnDestroy(): void {
    this._takeUntil.next(true);
  }

  private findHomeRoute(
    routes: SdgRoutes = this.router.config,
    basePath = ''
  ): SdgRoute | undefined {
    let homeRoute: SdgRoute | undefined;

    routes.some((route: SdgRoute) => {
      const path = this.getPath(route, basePath);
      if (route.isHome) {
        homeRoute = {
          ...route,
          path
        };
        return true;
      }

      if (route.children) {
        homeRoute = this.findHomeRoute(route.children, path);
        if (homeRoute) {
          return true;
        }
      }

      return false;
    });

    return homeRoute;
  }

  private getPath(
    route: SdgRoute,
    basePath: string | undefined
  ): string | undefined {
    let path = '';

    if (basePath?.length) {
      path = basePath;
    }

    if (route.path) {
      const pathResolved = this.resolveRoute(route);
      path += `/${pathResolved}`;
    }

    return path;
  }

  private resolveRoute(route: SdgRoute): string | undefined {
    return route.path
      ?.split('/')
      .map((pathSegment) => {
        if (pathSegment.includes(':')) {
          return this.activatedRoute.snapshot.params[pathSegment.substring(1)];
        }
        return pathSegment;
      })
      .join('/');
  }

  private getBreadsFromRouterSegments(): Breadcrumbs {
    const routes = this.getRouterBreadcrumbs();
    if (!routes.length) {
      return [];
    }

    const home = this.findHomeRoute();
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
    const routes = this.activatedRoute.pathFromRoot.filter((route) => {
      return route.routeConfig;
    });

    let currentRoute = this.activatedRoute;
    if (currentRoute.children.length) {
      currentRoute = this.activatedRoute.children[0];
      routes.push(currentRoute);
    }

    let lastUrl = '';
    return routes.reduce((breadcrumbs, route) => {
      const config: SdgRoute | null = route.routeConfig;
      if (!route || !config?.path) {
        return breadcrumbs;
      }

      const isCurrentRoute = currentRoute.toString() === route.toString();
      if (config?.hidden && !isCurrentRoute) {
        lastUrl = `${lastUrl}/${route.snapshot.url.join('/')}`;
        return breadcrumbs;
      }

      const title = route.snapshot.title ?? '';
      const url = (lastUrl = `${lastUrl}/${route.snapshot.url.join('/')}`);
      const breadcrumb: Breadcrumb = {
        id: `${title}-${url}`,
        title,
        url
      };

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
