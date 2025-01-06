import { Component, Signal } from '@angular/core';

import { BlockLinkComponent } from '@igo2/sdg';
import { BlockLinkSection, BlockLinkSections } from '@igo2/sdg';
import { BreakpointService, SdgRoute, TitleResolverPipe } from '@igo2/sdg/core';

import { BasicScreenComponent } from '../../components';
import { routes } from './showcases/showcases.routes';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [BasicScreenComponent, BlockLinkComponent],
  providers: [TitleResolverPipe],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {
  sections: BlockLinkSections;

  constructor(
    private breakpointService: BreakpointService,
    private titleResolverPipe: TitleResolverPipe
  ) {
    this.sections = this.setSections();
  }

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }

  private setSections(): BlockLinkSections {
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
          path: `/composants/showcases/${section.path}`,
          description: section.description ? section.description : undefined
        };
      });
  }
}

function isSection(route: SdgRoute): route is BlockLinkSection {
  return !!(route.title && route.path && !route.redirectTo);
}
