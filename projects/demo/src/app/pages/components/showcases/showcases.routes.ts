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
    path: 'avis',
    title: 'Avis',
    loadComponent: () =>
      import('./notice/notice.component').then((m) => m.NoticeDemoComponent)
  },
  {
    path: 'bouton',
    title: 'Bouton',
    loadComponent: () =>
      import('./button/button.component').then((m) => m.ButtonComponent)
  },
  {
    path: 'fil-ariane',
    title: "Fil d'Ariane",
    loadComponent: () =>
      import('./breadcrumb/breadcrumb.component').then(
        (m) => m.BreadcrumbComponent
      )
  },
  {
    path: 'pagination',
    title: 'Pagination',
    loadComponent: () =>
      import('./paginator/paginator.component').then(
        (m) => m.PaginatorDemoComponent
      )
  },
  {
    path: 'tuile',
    title: 'Tuile',
    loadComponent: () =>
      import('./tile/tile.component').then((m) => m.TileDemoComponent)
  }
];
