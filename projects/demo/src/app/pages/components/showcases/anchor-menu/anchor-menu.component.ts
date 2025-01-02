import { AfterContentInit, Component, ElementRef, Signal } from '@angular/core';

import { Anchor, AnchorMenuComponent, findTitleAnchors } from '@igo2/sdg';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

import { AppService } from '../../../../app.service';

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
    private appService: AppService,
    private elementRef: ElementRef
  ) {}

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
  }

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
