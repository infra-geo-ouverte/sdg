import { INavigationRoutes } from '@igo2/sdg';

export const routes: INavigationRoutes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    title: 'À propos',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent)
  },
  {
    path: 'composantes',
    title: 'Composantes',
    loadChildren: () =>
      import('./pages/components/components.routes').then((m) => m.routes)
  },
  {
    path: 'guides',
    title: 'Guides',
    loadComponent: () =>
      import('./pages/guides/guides.component').then((m) => m.GuidesComponent)
  }
];
