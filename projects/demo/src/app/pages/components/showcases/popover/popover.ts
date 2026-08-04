import { AfterContentInit, Component, ElementRef, inject } from '@angular/core';

import {
  Anchor,
  AnchorMenuComponent,
  ExternalLinkComponent,
  SdgPopover,
  findTitleAnchors
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-popover',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    SdgPopover,
    AnchorMenuComponent
  ],
  templateUrl: './popover.html'
})
export class PopoverDemoComponent implements AfterContentInit {
  private elementRef = inject(ElementRef);

  anchors: Anchor[] = [];

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
