import { Component, computed, input } from '@angular/core';

import { IMapFooterAttribution } from '../..';

@Component({
  selector: 'sdg-full-map-skeleton-footer',
  imports: [],
  templateUrl: './full-map-footer.component.html',
  styles: `
    :host {
      display: flex;
      align-items: center;
      column-gap: 12px;
    }
  `
})
export class SdgFullMapSkeletonFooter {
  readonly attribution = input.required<IMapFooterAttribution>();

  readonly publicationYear = computed(() => {
    const date = this.attribution().firstPublicationDate;
    const year = this.extractYear(date);
    return year ? ', ' + year : '';
  });

  private extractYear(date: string | Date | undefined): string | undefined {
    if (!date) {
      return undefined;
    }
    return typeof date === 'string'
      ? (date.match(/\d{4}/)?.[0] ?? '')
      : new Intl.DateTimeFormat('en', {
          year: 'numeric',
          timeZone: 'America/Toronto'
        }).format(date);
  }
}
