import { AfterContentInit, Component, ElementRef, Signal } from '@angular/core';

import { AnchorMenuComponent } from '@igo2/sdg';

import { Anchor } from 'packages/sdg/src/lib/anchor-menu/anchor-menu.interface';

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
    const elements = (
      this.elementRef.nativeElement as HTMLElement
    ).getElementsByTagName('h2');

    this.anchors = Array.from(elements).map((element) => ({
      text: element.innerText,
      htmlElementId: element.id
    }));
  }
}
