import { Component, Signal } from '@angular/core';

import { BlockLinkComponent, BlockLinkSections } from '@igo2/sdg';
import { BreakpointService, TitleResolverPipe } from '@igo2/sdg/core';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-block-link',
  standalone: true,
  imports: [ExampleViewerComponent, BlockLinkComponent],
  providers: [TitleResolverPipe],
  templateUrl: './block-link.component.html',
  styleUrl: './block-link.component.scss'
})
export class BlockLinkDemoComponent {
  sections1: BlockLinkSections = [
    {
      title: 'Avis',
      path: '/composants/showcases/avis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Google',
      path: 'https://www.google.com/',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  sections2: BlockLinkSections = [
    {
      title: 'Pagination',
      path: '/composants/showcases/pagination',
      subsections: [
        { title: 'Alerte', path: '/composants/showcases/alerte' },
        { title: 'Google', path: 'https://www.google.com/' }
      ]
    },
    {
      title: 'Pagination',
      path: '/composants/showcases/pagination',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      subsections: [
        { title: 'Alerte', path: '/composants/showcases/alerte' },
        { title: 'Google', path: 'https://www.google.com/' }
      ]
    }
  ];

  sections3: BlockLinkSections = [
    {
      icon: 'info',
      title: 'Avis',
      path: '/composants/showcases/avis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: 'info',
      title: 'Avis',
      path: '/composants/showcases/avis',
      subsections: [
        { title: 'Alerte', path: '/composants/showcases/alerte' },
        { title: 'Google', path: 'https://www.google.com/' }
      ]
    }
  ];

  constructor(
    private breakpointService: BreakpointService,
    private titleResolverPipe: TitleResolverPipe
  ) {
    this.getSections(this.sections1);
    this.getSections(this.sections2);
    this.getSections(this.sections3);
  }

  private getSections(sections: BlockLinkSections): void {
    sections.forEach((section, sectionIndex) => {
      const sectionTitle = this.titleResolverPipe.transform(section);
      if (!sectionTitle) {
        throw new Error(`Title not found for section ${sectionIndex}`);
      } else if (!section.path) {
        throw new Error(`Path not found or section ${sectionIndex}`);
      } else if (!section.description && !section.subsections) {
        throw new Error(
          `Subsections array must not be empty for section ${sectionIndex}`
        );
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
    return this.breakpointService.isHandset;
  }
}
