import { ActivatedRoute, Params } from '@angular/router';

import { SdgRoute, SdgRoutes, TitleResolver, resolveTitle } from '../router';
import { Breadcrumb, Breadcrumbs } from './shared/breadcrumbs.interface';

export interface RouterBreadcrumbsOptions {
  activatedRoute: ActivatedRoute;
  routerConfig: SdgRoutes;
  titleResolver?: TitleResolver | null;
}

export function getBreadcrumbsFromRouterSegments({
  activatedRoute,
  routerConfig,
  titleResolver
}: RouterBreadcrumbsOptions): Breadcrumbs {
  const routes = getRouterBreadcrumbs(activatedRoute);
  if (!routes.length) {
    return [];
  }

  const home = findHomeRoute(routerConfig, getRouteParams(activatedRoute));
  if (!home) {
    throw new Error(
      'We need at least one home to construct the breadcrumbs list. You need to setup a route with the isHome property at true'
    );
  }

  if (routes[0].url === home.path) {
    return [];
  }

  const title = resolveTitle(home, titleResolver) ?? '';
  const url = home.path ?? '';
  routes.unshift({
    id: `${title}-${url}`,
    title,
    url
  });

  return routes;
}

export function getRouterBreadcrumbs(
  activatedRoute: ActivatedRoute
): Breadcrumbs {
  const routes = activatedRoute.pathFromRoot.filter((route) => {
    return route.routeConfig;
  });

  let currentRoute = activatedRoute;
  if (currentRoute.children.length) {
    currentRoute = activatedRoute.children[0];
    routes.push(currentRoute);
  }

  let lastUrl = '';
  return routes.reduce((breadcrumbs, route) => {
    const config = route.routeConfig as SdgRoute | null;
    if (!route || !config?.path) {
      return breadcrumbs;
    }

    const isCurrentRoute = currentRoute.toString() === route.toString();
    if (config.hidden && !isCurrentRoute) {
      lastUrl = `${lastUrl}/${route.snapshot.url.join('/')}`;
      return breadcrumbs;
    }

    const title = route.snapshot.title ?? '';
    const url = (lastUrl = `${lastUrl}/${route.snapshot.url.join('/')}`);
    const redirectTo = config.children?.[0].redirectTo;
    const breadcrumb: Breadcrumb = {
      id: `${title}-${url}`,
      title,
      url,
      redirectTo: typeof redirectTo === 'string' ? redirectTo : undefined
    };

    return breadcrumbs.concat(breadcrumb);
  }, [] as Breadcrumbs);
}

function findHomeRoute(
  routes: SdgRoutes,
  params: Params,
  basePath = ''
): SdgRoute | undefined {
  let homeRoute: SdgRoute | undefined;

  routes.some((route: SdgRoute) => {
    const path = getPath(route, params, basePath);
    if (route.isHome) {
      homeRoute = {
        ...route,
        path
      };
      return true;
    }

    if (route.children) {
      homeRoute = findHomeRoute(route.children, params, path);
      if (homeRoute) {
        return true;
      }
    }

    return false;
  });

  return homeRoute;
}

function getRouteParams(activatedRoute: ActivatedRoute): Params {
  return activatedRoute.pathFromRoot.reduce(
    (params, route) => ({ ...params, ...route.snapshot.params }),
    { ...activatedRoute.snapshot.params }
  );
}

function getPath(
  route: SdgRoute,
  params: Params,
  basePath: string | undefined
): string | undefined {
  let path = '';

  if (basePath?.length) {
    path = basePath;
  }

  if (route.path) {
    const pathResolved = resolveRoute(route, params);
    path += `/${pathResolved}`;
  }

  return path;
}

function resolveRoute(route: SdgRoute, params: Params): string | undefined {
  return route.path
    ?.split('/')
    .map((pathSegment) => {
      if (pathSegment.includes(':')) {
        return params[pathSegment.substring(1)];
      }
      return pathSegment;
    })
    .join('/');
}
