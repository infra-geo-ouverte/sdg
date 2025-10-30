import { RouteTranslateKey, SdgRoutes } from '@igo2/sdg-core';

import { AppTitleResolver } from './config/title-resolver';

export const routes: SdgRoutes = [
  {
    path: ':lang',
    hidden: true,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        isHome: true,
        title: AppTitleResolver,
        data: { [RouteTranslateKey]: 'navigation.about' },
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent)
      },
      {
        path: 'composants',
        title: AppTitleResolver,
        data: { [RouteTranslateKey]: 'navigation.components' },
        loadChildren: () =>
          import('./pages/components/components.routes').then((m) => m.routes)
      },
      {
        path: 'guides',
        title: AppTitleResolver,
        data: { [RouteTranslateKey]: 'navigation.guides' },
        loadComponent: () =>
          import('./pages/guides/guides.component').then(
            (m) => m.GuidesComponent
          )
      },
      {
        path: 'contact-us',
        title: AppTitleResolver,
        data: {
          [RouteTranslateKey]: 'header.contactUs'
        },
        hidden: true,
        loadComponent: () =>
          import('./pages/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          )
      }
    ]
  },
  { path: '', redirectTo: '/fr', pathMatch: 'full', hidden: true }, // default redirect,
  { path: '**', redirectTo: '/fr', hidden: true } // default redirect,
];
