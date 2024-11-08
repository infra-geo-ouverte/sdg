import { AfterContentInit, Component, ElementRef, Signal } from '@angular/core';

import { Anchor, AnchorMenuComponent, findTitleAnchors } from '@igo2/sdg';

import { AppService } from '../../../../app.service';
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
  constructor(
    private appService: AppService,
    private elementRef: ElementRef
  ) {}

  anchors: Anchor[] = [];

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
