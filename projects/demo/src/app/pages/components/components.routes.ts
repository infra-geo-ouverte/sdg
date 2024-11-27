import { SdgRoutes } from '@igo2/sdg/core';

export const routes: SdgRoutes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('./components.component').then((m) => m.ComponentsComponent)
  },
  {
    path: 'showcases',
    loadComponent: () =>
      import('./showcases/showcases.component').then(
        (m) => m.ShowcasesComponent
      ),
    loadChildren: () =>
      import('./showcases/showcases.routes').then((m) => m.routes)
  }
];
