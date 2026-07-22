import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  Anchor,
  AnchorMenuComponent,
  ExternalLinkComponent,
  findTitleAnchors
} from '@igo2/sdg-common';
import { SdgSearchBar } from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-search-bar',
  imports: [
    ExampleViewerComponent,
    SdgSearchBar,
    ExternalLinkComponent,
    AnchorMenuComponent,
    RouterLink
  ],
  templateUrl: './search-bar.component.html',
  styles: `
    .search-bar-dark {
      background-color: var(--sdg-color-blue-dark);
      padding: var(--sdg-spacer-md);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarDemoComponent implements AfterContentInit {
  private elementRef = inject(ElementRef);

  readonly searchTerm1 = signal('');
  readonly liveTerm1 = signal('');
  readonly searchTerm2 = signal('');
  readonly liveTerm2 = signal('');

  anchors: Anchor[] = [];

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
