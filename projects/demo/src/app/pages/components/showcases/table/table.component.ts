import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component, ElementRef, inject } from '@angular/core';

import {
  Anchor,
  AnchorMenuComponent,
  ExternalLinkComponent,
  findTitleAnchors
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-table',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    AnchorMenuComponent,
    NgTemplateOutlet
  ],
  templateUrl: './table.component.html'
})
export class TableDemoComponent implements AfterContentInit {
  private elementRef = inject(ElementRef);

  anchors: Anchor[] = [];

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
