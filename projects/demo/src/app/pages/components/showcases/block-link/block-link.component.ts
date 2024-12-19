import { Component, Signal } from '@angular/core';

import { BlockLinkComponent } from '@igo2/sdg';
import { BlockLinkSections } from '@igo2/sdg';
import { TitleResolverPipe } from '@igo2/sdg/core';

import { AppService } from '../../../../app.service';
import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';

@Component({
  selector: 'app-block-link',
  standalone: true,
  imports: [ExampleViewerComponent, BlockLinkComponent],
  providers: [TitleResolverPipe],
  templateUrl: './block-link.component.html',
  styleUrl: './block-link.component.scss'
})
export class BlockLinkDemoComponent {
  sections: BlockLinkSections = [
    {
      title: 'Avis',
      path: '/composants/showcases/avis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Pagination',
      path: '/composants/showcases/pagination',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Google',
      path: 'https://www.google.com/',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  constructor(
    private appService: AppService,
    private titleResolverPipe: TitleResolverPipe
  ) {
    this.sections.forEach((section, sectionIndex) => {
      const sectionTitle = this.titleResolverPipe.transform(section);
      if (!sectionTitle) {
        throw new Error(`Title not found for section ${sectionIndex}`);
      } else if (!section.path) {
        throw new Error(`Path not found or section ${sectionIndex}`);
      } else if (!section.description) {
        throw new Error(`Description not found for section ${sectionIndex}`);
      }
      if (section.subsections) {
        if (section.subsections.length === 0) {
          throw new Error(
            `Subsections array empty for section ${sectionIndex}`
          );
        }
        section.subsections.forEach((subsection, subsectionIndex) => {
          const subsectionTitle = this.titleResolverPipe.transform(subsection);
          if (!subsectionTitle) {
            throw new Error(
              `Subsection title not found for section ${sectionIndex}, subsection ${subsectionIndex}`
            );
          } else if (!subsection.path) {
            throw new Error(
              `Subsection path not found for section ${sectionIndex}, subsection ${subsectionIndex}`
            );
          }
        });
      }
    });
  }

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }
}
