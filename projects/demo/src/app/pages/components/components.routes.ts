import { RouteTranslateKey, SdgRoutes } from '@igo2/sdg-core';

import { AppTitleResolver } from '../../config/title-resolver';

export const routes: SdgRoutes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('./components.component').then((m) => m.ComponentsComponent)
  },
  {
    path: 'showcases/common',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'Composants communs'
    },
    loadComponent: () =>
      import('./showcases/showcases.component').then(
        (m) => m.ShowcasesComponent
      ),
    loadChildren: () =>
      import('./showcases/showcases.routes').then((m) => m.routes)
  },
  {
    path: 'showcases/carto',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'Cartographie'
    },
    loadComponent: () =>
      import('./showcases-carto/showcases-carto.component').then(
        (m) => m.ShowcasesCartoComponent
      ),
    loadChildren: () =>
      import('./showcases-carto/showcases-carto.routes').then((m) => m.routes)
  }
];
