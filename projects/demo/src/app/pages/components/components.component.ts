import { Component, WritableSignal } from '@angular/core';

import {
  BlockLinkComponent,
  BlockLinkSection,
  BlockLinkSections
} from '@igo2/sdg-common';
import {
  Language,
  SdgRoute,
  SdgRoutes,
  TitleResolverPipe
} from '@igo2/sdg-core';

import { BasicScreenComponent } from '../../components';
import { AppTranslationService } from '../../config/translation/translation.service';
import { routes as routesCarto } from './showcases-carto/showcases-carto.routes';
import { routes } from './showcases/showcases.routes';

@Component({
  selector: 'app-components',
  imports: [BasicScreenComponent, BlockLinkComponent],
  providers: [TitleResolverPipe],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {
  sections: BlockLinkSections;
  sectionsCarto: BlockLinkSections;

  constructor(
    private titleResolverPipe: TitleResolverPipe,
    private translationService: AppTranslationService
  ) {
    this.sections = this.setSections(routes, 'common');
    this.sectionsCarto = this.setSections(routesCarto, 'carto');
  }

  get lang(): WritableSignal<Language> {
    return this.translationService.lang;
  }

  private setSections(
    routes: SdgRoutes,
    prefixSection: string
  ): BlockLinkSections {
    return routes
      .filter((route) => isSection(route))
      .map((section, sectionIndex) => {
        const title = this.titleResolverPipe.transform(section);
        if (!title) {
          throw new Error(`Title not found for section ${sectionIndex}`);
        }
        return {
          ...section,
          title: title,
          path: `../composants/showcases/${prefixSection}/${section.path}`,
          description: section.description
        };
      });
  }
}

function isSection(route: SdgRoute): route is BlockLinkSection {
  return !!(route.title && route.path && !route.redirectTo);
}
