import { Component, inject } from '@angular/core';

import { BlockLinkComponent, BlockLinkSections } from '@igo2/sdg-common';
import { TranslationService } from '@igo2/sdg-i18n';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';

@Component({
  selector: 'app-block-link',
  imports: [ExampleViewerComponent, BlockLinkComponent],
  templateUrl: './block-link.component.html',
  styleUrl: './block-link.component.scss'
})
export class BlockLinkDemoComponent {
  private translationService = inject(TranslationService);

  sections1: BlockLinkSections = [
    {
      title: 'showcases.notice',
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
      title: 'showcases.paginator',
      path: '/composants/showcases/pagination',
      subsections: [
        { title: 'showcases.alert', path: '/composants/showcases/alerte' },
        { title: 'Google', path: 'https://www.google.com/' }
      ]
    },
    {
      title: 'showcases.paginator',
      path: '/composants/showcases/pagination',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      subsections: [
        { title: 'showcases.alert', path: '/composants/showcases/alerte' },
        { title: 'Google', path: 'https://www.google.com/' }
      ]
    }
  ];

  sections3: BlockLinkSections = [
    {
      icon: 'info',
      title: 'showcases.notice',
      path: '/composants/showcases/avis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: 'info',
      title: 'showcases.notice',
      path: '/composants/showcases/avis',
      subsections: [
        { title: 'showcases.alert', path: '/composants/showcases/alerte' },
        { title: 'Google', path: 'https://www.google.com/' }
      ]
    }
  ];

  constructor() {
    this.getSections(this.sections1);
    this.getSections(this.sections2);
    this.getSections(this.sections3);
  }

  private getSections(sections: BlockLinkSections): void {
    sections.forEach((section, sectionIndex) => {
      section.title = this.translationService.get(section.title);

      if (!section.title) {
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
          subsection.title = this.translationService.get(subsection.title);
          if (!subsection.title) {
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
}
