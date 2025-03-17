import { Component } from '@angular/core';

import { BlockLinkComponent } from '@igo2/sdg';
import { BlockLinkSection, BlockLinkSections } from '@igo2/sdg';
import {
  SdgRoute,
  SdgRoutes,
  TitleResolverPipe,
  TranslationService
} from '@igo2/sdg/core';

import { BasicScreenComponent } from '../../components';
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
    private translationService: TranslationService
  ) {
    this.sections = this.setSections(routes, 'common');
    this.sectionsCarto = this.setSections(routesCarto, 'carto');
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
          path: `/composants/showcases/${prefixSection}/${section.path}`,
          description: section.description,
          seeMoreLabel: this.translationService.get('seeMore')
        };
      });
  }
}

function isSection(route: SdgRoute): route is BlockLinkSection {
  return !!(route.title && route.path && !route.redirectTo);
}
