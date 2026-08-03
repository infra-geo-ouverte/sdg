import { AfterContentInit, Component, ElementRef, inject } from '@angular/core';

import {
  Anchor,
  AnchorMenuComponent,
  ExternalLinkComponent,
  TooltipComponent,
  findTitleAnchors
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-tooltip',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    TooltipComponent,
    AnchorMenuComponent
  ],
  templateUrl: './tooltip.component.html'
})
export class TooltipDemoComponent implements AfterContentInit {
  private elementRef = inject(ElementRef);

  anchors: Anchor[] = [];

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
