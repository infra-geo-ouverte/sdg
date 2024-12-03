import { RouteTranslateKey, SdgRoutes } from '@igo2/sdg/core';

import { AppTitleResolver } from '../../../config/title-resolver';

export const routes: SdgRoutes = [
  { path: '', redirectTo: 'breadcrumb', pathMatch: 'full' },
  {
    path: 'a-consulter-aussi',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.alsoSee'
    },
    description:
      'Le bloc À consulter aussi propose des éléments d’information qui complètent le contenu principal.',
    loadComponent: () =>
      import('./consult/consult.component').then((m) => m.ConsultDemoComponent)
  },
  {
    path: 'alerte',
    title: 'Alerte',
    description:
      "L'alerte générale sert aux avertissements et messages de haute importance qui touchent l'ensemble de la population ou la grande majorité.",
    loadComponent: () =>
      import('./alert/alert.component').then((m) => m.AlertDemoComponent)
  },
  {
    path: 'avis',
    title: 'Avis',
    description:
      'Les avis sont des messages contextuels qui peuvent s’afficher sur une page ou sur plusieurs pages d’un même sujet.',
    loadComponent: () =>
      import('./notice/notice.component').then((m) => m.NoticeDemoComponent)
  },
  {
    path: 'bouton',
    title: 'Bouton',
    description:
      'Les boutons indiquent les actions qui peuvent être exécutées sur une page.',
    loadComponent: () =>
      import('./button/button.component').then((m) => m.ButtonDemoComponent)
  },
  {
    path: 'coordonnees',
    title: 'Coordonnées',
    description:
      'Le bloc de coordonnées sert à présenter des informations de contact telles que le numéro de téléphone, l’adresse, le courriel et les heures d’ouverture d’un lieu ou d’un service.',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactDemoComponent)
  },
  {
    path: 'fil-ariane',
    title: "Fil d'Ariane",
    description:
      'Le fil d’Ariane permet de se situer dans la structure d’un site.',
    loadComponent: () =>
      import('./breadcrumb/breadcrumb.component').then(
        (m) => m.BreadcrumbDemoComponent
      )
  },
  {
    path: 'liens-sequentiels',
    title: 'Liens séquentiels',
    description:
      'Les liens séquentiels sont des liens permettant de naviguer vers une page de contenu suivante ou précédente.',
    loadComponent: () =>
      import('./sequential-links/sequential-links.component').then(
        (m) => m.SequentialLinksDemoComponent
      )
  },
  {
    path: 'lien-en-bloc',
    title: 'Lien en bloc',
    description:
      "Le lien en bloc est un élément de navigation qui permet aux utilisateurs de naviguer rapidement vers différentes sections d'une application ou vers un site web externe.",
    loadComponent: () =>
      import('./block-link/block-link.component').then(
        (m) => m.BlockLinkDemoComponent
      )
  },
  {
    path: 'menu-ancres',
    title: "Menu d'ancres",
    description:
      'Le menu d’ancres est un élément de navigation interne qui permet aux utilisateurs de naviguer rapidement vers différentes sections d’une page Web.',
    loadComponent: () =>
      import('./anchor-menu/anchor-menu.component').then(
        (m) => m.AnchorMenuDemoComponent
      )
  },
  {
    path: 'pagination',
    title: 'Pagination',
    description:
      'La pagination, en divisant le contenu en pages, simplifie la gestion des données volumineuses tout en facilitant la navigation.',
    loadComponent: () =>
      import('./paginator/paginator.component').then(
        (m) => m.PaginatorDemoComponent
      )
  },
  {
    path: 'tuile',
    title: 'Tuile',
    description:
      'Les tuiles cliquables sont des éléments de navigation mis en évidence.',
    loadComponent: () =>
      import('./tile/tile.component').then((m) => m.TileDemoComponent)
  }
];
