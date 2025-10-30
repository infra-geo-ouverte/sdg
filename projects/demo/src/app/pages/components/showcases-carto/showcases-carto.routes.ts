import { RouteTranslateKey, SdgRoutes } from '@igo2/sdg-core';

import { AppTitleResolver } from '../../../config/title-resolver';

export const routes: SdgRoutes = [
  { path: '', redirectTo: 'breadcrumbs', pathMatch: 'full' },
  {
    path: 'reference-map',
    title: AppTitleResolver,
    data: {
      [RouteTranslateKey]: 'showcasesCarto.referenceMap'
    },
    description:
      "Une carte de référence correspond à une vignette cartographique permettant la localisation ou la mise en contexte d'un sujet. Elle est placée dans une page informationnelle.",
    loadComponent: () =>
      import('./reference-map/reference-map.component').then(
        (m) => m.ReferenceMapDemoComponent
      )
  }
];
