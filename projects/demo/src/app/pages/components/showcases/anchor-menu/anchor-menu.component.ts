import { AfterContentInit, Component, ElementRef } from '@angular/core';

import {
  Anchor,
  AnchorMenuComponent,
  findTitleAnchors
} from '@igo2/sdg-common';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-anchor-menu',
  imports: [ExampleViewerComponent, AnchorMenuComponent, ExternalLinkComponent],
  templateUrl: './anchor-menu.component.html',
  styleUrl: './anchor-menu.component.scss'
})
export class AnchorMenuDemoComponent implements AfterContentInit {
  anchors: Anchor[] = [];

  constructor(private elementRef: ElementRef) {}

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
