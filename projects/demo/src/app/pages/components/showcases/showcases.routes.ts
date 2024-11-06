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
    path: 'coordonnees',
    title: 'Coordonnées',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactDemoComponent)
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
    path: 'liens-sequentiels',
    title: 'Liens séquentiels',
    loadComponent: () =>
      import('./sequential-links/sequential-links.component').then(
        (m) => m.SequentialLinksDemoComponent
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
