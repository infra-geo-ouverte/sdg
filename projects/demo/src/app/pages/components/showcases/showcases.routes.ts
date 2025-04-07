import { RouteTranslateKey, SdgRoutes } from '@igo2/sdg/core';

import { AppTitleResolver } from '../../../config/title-resolver';

export const routes: SdgRoutes = [
  { path: '', redirectTo: 'breadcrumbs', pathMatch: 'full' },
  {
    path: 'a-consulter-aussi',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.consult'
    },
    description:
      "Le bloc À consulter aussi propose des éléments d'information qui complètent le contenu principal.",
    loadComponent: () =>
      import('./consult/consult.component').then((m) => m.ConsultDemoComponent)
  },
  {
    path: 'alerte',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.alert'
    },
    description:
      "L'alerte générale sert aux avertissements et messages de haute importance qui touchent l'ensemble de la population ou la grande majorité.",
    loadComponent: () =>
      import('./alert/alert.component').then((m) => m.AlertDemoComponent)
  },
  {
    path: 'avis',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.notice'
    },
    description:
      "Les avis sont des messages contextuels qui peuvent s'afficher sur une page ou sur plusieurs pages d'un même sujet.",
    loadComponent: () =>
      import('./notice/notice.component').then((m) => m.NoticeDemoComponent)
  },
  {
    path: 'bandeau-piv',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.header'
    },
    description:
      "Le Bandeau d'en-tête du Programme d'identification visuelle (PIV) est le premier élément visible dans le haut de chaque page. Il permet d'identifier le site et d'indiquer que celui-ci est un site officiel du gouvernement du Québec.",
    loadComponent: () =>
      import('./header/header.component').then((m) => m.HeaderDemoComponent)
  },
  {
    path: 'bouton',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.button'
    },
    description:
      'Les boutons indiquent les actions qui peuvent être exécutées sur une page.',
    loadComponent: () =>
      import('./button/button.component').then((m) => m.ButtonDemoComponent)
  },
  {
    path: 'coordonnees',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.contact'
    },
    description:
      "Le bloc de coordonnées sert à présenter des informations de contact telles que le numéro de téléphone, l'adresse, le courriel et les heures d'ouverture d'un lieu ou d'un service.",
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactDemoComponent)
  },
  {
    path: 'fil-ariane',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.breadcrumbs'
    },
    description:
      "Le fil d'Ariane permet de se situer dans la structure d'un site.",
    loadComponent: () =>
      import('./breadcrumbs/breadcrumbs.component').then(
        (m) => m.BreadcrumbsDemoComponent
      )
  },
  {
    path: 'haut-page',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.topPage'
    },
    description:
      'Le bouton haut de page permet de remonter rapidement vers le haut de la page.',
    loadComponent: () =>
      import('./top-page-button/top-page-button.component').then(
        (m) => m.TopPageButtonDemoComponent
      )
  },
  {
    path: 'liens-sequentiels',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.sequentialLinks'
    },
    description:
      'Les liens séquentiels sont des liens permettant de naviguer vers une page de contenu suivante ou précédente.',
    loadComponent: () =>
      import('./sequential-links/sequential-links.component').then(
        (m) => m.SequentialLinksDemoComponent
      )
  },
  {
    path: 'lien-en-bloc',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.blockLink'
    },
    description:
      "Le lien en bloc est un élément de navigation qui permet aux utilisateurs de naviguer rapidement vers différentes sections d'une application ou vers un site web externe.",
    loadComponent: () =>
      import('./block-link/block-link.component').then(
        (m) => m.BlockLinkDemoComponent
      )
  },
  {
    path: 'menu-lateral',
    title: 'Menu latéral',
    description:
      "Le menu latéral est une liste de liens permettant de naviguer entre différentes sections d'un site web.",
    loadComponent: () =>
      import('./lateral-menu/lateral-menu.component').then(
        (m) => m.LateralMenuDemoComponent
      )
  },
  {
    path: 'menu-ancres',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.anchorMenu'
    },
    description:
      "Le menu d'ancres est un élément de navigation interne qui permet aux utilisateurs de naviguer rapidement vers différentes sections d'une page Web.",
    loadComponent: () =>
      import('./anchor-menu/anchor-menu.component').then(
        (m) => m.AnchorMenuDemoComponent
      )
  },
  {
    path: 'navigation',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.navigation'
    },
    description:
      'Le menu de navigation principale est un élément essentiel pour une navigation fluide et intuitive sur un site Web ou une application.',
    loadComponent: () =>
      import('./navigation/navigation.component').then(
        (m) => m.NavigationDemoComponent
      )
  },
  {
    path: 'pagination',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.paginator'
    },
    description:
      'La pagination, en divisant le contenu en pages, simplifie la gestion des données volumineuses tout en facilitant la navigation.',
    loadComponent: () =>
      import('./paginator/paginator.component').then(
        (m) => m.PaginatorDemoComponent
      )
  },
  {
    path: 'pied-de-page',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.footer'
    },
    description:
      "Le pied de page permet d'accéder aux différentes sections du site web, de consulter des liens complémentaires et accéder aux informations de droit d'auteur.",
    loadComponent: () =>
      import('./footer/footer.component').then((m) => m.FooterDemoComponent)
  },
  {
    path: 'tuile',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcases.tile'
    },
    description:
      'Les tuiles cliquables sont des éléments de navigation mis en évidence.',
    loadComponent: () =>
      import('./tile/tile.component').then((m) => m.TileDemoComponent)
  }
];
