import { INavigationRoutes } from '@igo2/sdg';

import { AppTitleResolver } from './config/title-resolver';

export const routes: INavigationRoutes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    title: AppTitleResolver,
    data: { title: 'about' },
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
  },
  {
    path: 'contact-us',
    title: AppTitleResolver,
    data: {
      title: 'header.contactUs'
    },
    hidden: true,
    loadComponent: () =>
      import('./pages/contact-us/contact-us.component').then(
        (m) => m.ContactUsComponent
      )
  }
];
