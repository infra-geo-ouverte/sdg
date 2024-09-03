import { INavigationRoutes } from '@igo2/sdg';

export const routes: INavigationRoutes = [
  { path: '', redirectTo: 'breadcrumb', pathMatch: 'full' },
  {
    path: 'a-consulter-aussi',
    title: 'À consulter aussi',
    loadComponent: () =>
      import('./consult/consult.component').then((m) => m.ConsultDemoComponent)
  },
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
      import('./button/button.component').then((m) => m.ButtonDemoComponent)
  },
  {
    path: 'fil-ariane',
    title: "Fil d'Ariane",
    loadComponent: () =>
      import('./breadcrumb/breadcrumb.component').then(
        (m) => m.BreadcrumbDemoComponent
      )
  },
  {
    path: 'menu-ancres',
    title: "Menu d'ancres",
    loadComponent: () =>
      import('./anchor-menu/anchor-menu.component').then(
        (m) => m.AnchorMenuDemoComponent
      )
  },
  {
    path: 'tuile',
    title: 'Tuile',
    loadComponent: () =>
      import('./tile/tile.component').then((m) => m.TileDemoComponent)
  }
];
