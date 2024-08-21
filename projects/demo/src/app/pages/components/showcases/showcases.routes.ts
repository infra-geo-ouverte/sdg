import { INavigationRoutes } from '@igo2/sdg';

export const routes: INavigationRoutes = [
  { path: '', redirectTo: 'breadcrumb', pathMatch: 'full' },
  {
    path: 'alerte',
    title: 'Alerte',
    loadComponent: () =>
      import('./alert/alert.component').then((m) => m.AlertDemoComponent)
  },
  {
    path: 'breadcrumb',
    title: 'Breadcrumb',
    loadComponent: () =>
      import('./breadcrumb/breadcrumb.component').then(
        (m) => m.BreadcrumbComponent
      )
  },
  {
    path: 'button',
    title: 'Button',
    loadComponent: () =>
      import('./button/button.component').then((m) => m.ButtonComponent)
  }
];
