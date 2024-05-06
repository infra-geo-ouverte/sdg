import { INavigationRoutes } from '@igo2/sdg';

export const routes: INavigationRoutes = [
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
