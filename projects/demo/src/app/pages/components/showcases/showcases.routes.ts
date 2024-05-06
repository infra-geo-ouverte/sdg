import { INavigationRoutes } from '@igo2/sdg';

export const routes: INavigationRoutes = [
  { path: '', redirectTo: 'breadcrumb', pathMatch: 'full' },
  {
    path: 'breadcrumb',
    title: 'Breadcrumb',
    loadComponent: () =>
      import('./breadcrumb-showcase/breadcrumb-showcase.component').then(
        (m) => m.BreadcrumbShowcaseComponent
      )
  }
];
