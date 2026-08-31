import { ActivatedRoute, Params, UrlSegment } from '@angular/router';

import { SdgRoute } from '../router';
import {
  getBreadcrumbsFromRouterSegments,
  getRouterBreadcrumbs
} from './breadcrumbs-with-router.utils';

describe('breadcrumbs with router utils', () => {
  describe('getRouterBreadcrumbs', () => {
    it('should skip hidden parent routes while preserving their URL segments', () => {
      const rootRoute = createActivatedRoute({ routeConfig: { path: '' } });
      const parentRoute = createActivatedRoute({
        id: 'parent',
        routeConfig: { path: 'parent', hidden: true },
        url: ['parent']
      });
      const childRoute = createActivatedRoute({
        id: 'child',
        routeConfig: { path: 'child' },
        title: 'Child',
        url: ['child']
      });
      const activatedRoute = createActivatedRoute({
        children: [],
        pathFromRoot: [rootRoute, parentRoute, childRoute]
      });

      const breadcrumbs = getRouterBreadcrumbs(activatedRoute);

      expect(breadcrumbs).toEqual([
        {
          id: 'Child-/parent/child',
          title: 'Child',
          url: '/parent/child',
          redirectTo: undefined
        }
      ]);
    });
  });

  describe('getBreadcrumbsFromRouterSegments', () => {
    it('should prepend the configured home route', () => {
      const parentRoute = createActivatedRoute({
        id: 'parent',
        params: { territoryId: '12' },
        routeConfig: {
          path: 'territoires/:territoryId',
          hidden: true
        },
        url: ['territoires', '12']
      });
      const pageRoute = createActivatedRoute({
        id: 'page',
        routeConfig: { path: 'page' },
        title: 'Page',
        url: ['page']
      });
      const activatedRoute = createActivatedRoute({
        id: 'active',
        pathFromRoot: [parentRoute, pageRoute]
      });

      const breadcrumbs = getBreadcrumbsFromRouterSegments({
        activatedRoute,
        routerConfig: [
          {
            path: 'territoires/:territoryId',
            children: [
              {
                path: 'accueil',
                title: 'Accueil',
                isHome: true
              }
            ]
          }
        ]
      });

      expect(breadcrumbs).toEqual([
        {
          id: 'Accueil-/territoires/12/accueil',
          title: 'Accueil',
          url: '/territoires/12/accueil'
        },
        {
          id: 'Page-/territoires/12/page',
          title: 'Page',
          url: '/territoires/12/page',
          redirectTo: undefined
        }
      ]);
    });

    it('should return no breadcrumbs when the current route matches the home route', () => {
      const homeRoute = createActivatedRoute({
        routeConfig: { path: 'home' },
        title: 'Accueil',
        url: ['home']
      });
      const activatedRoute = createActivatedRoute({
        pathFromRoot: [homeRoute]
      });

      const breadcrumbs = getBreadcrumbsFromRouterSegments({
        activatedRoute,
        routerConfig: [{ path: 'home', title: 'Accueil', isHome: true }]
      });

      expect(breadcrumbs).toEqual([]);
    });

    it('should keep breadcrumbs for a different route with the home title', () => {
      const pageRoute = createActivatedRoute({
        routeConfig: { path: 'other' },
        title: 'Accueil',
        url: ['other']
      });
      const activatedRoute = createActivatedRoute({
        pathFromRoot: [pageRoute]
      });

      const breadcrumbs = getBreadcrumbsFromRouterSegments({
        activatedRoute,
        routerConfig: [{ path: 'home', title: 'Accueil', isHome: true }]
      });

      expect(breadcrumbs).toHaveLength(2);
      expect(breadcrumbs[1].url).toBe('/other');
    });
  });
});

interface ActivatedRouteOptions {
  children?: ActivatedRoute[];
  id?: string;
  params?: Params;
  pathFromRoot?: ActivatedRoute[];
  routeConfig?: SdgRoute | null;
  title?: string;
  url?: string[];
}

function createActivatedRoute({
  children = [],
  id = '',
  params = {},
  pathFromRoot = [],
  routeConfig = null,
  title,
  url = []
}: ActivatedRouteOptions): ActivatedRoute {
  return {
    children,
    pathFromRoot,
    routeConfig,
    snapshot: {
      params,
      title,
      url: url.map((segment) => new UrlSegment(segment, {}))
    },
    toString: () => id
  } as unknown as ActivatedRoute;
}
