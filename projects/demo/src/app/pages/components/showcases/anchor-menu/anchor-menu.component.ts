import { AfterContentInit, Component, ElementRef, Signal } from '@angular/core';

import { Anchor, AnchorMenuComponent, findTitleAnchors } from '@igo2/sdg';
import { BreakpointService } from '@igo2/sdg/core';

import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

@Component({
  selector: 'app-anchor-menu',
  standalone: true,
  imports: [ExampleViewerComponent, AnchorMenuComponent, ExternalLinkComponent],
  templateUrl: './anchor-menu.component.html',
  styleUrl: './anchor-menu.component.scss'
})
export class AnchorMenuDemoComponent implements AfterContentInit {
  anchors: Anchor[] = [];

  constructor(
    private breakpointService: BreakpointService,
    private elementRef: ElementRef
  ) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
