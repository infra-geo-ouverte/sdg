import {
  AfterContentInit,
  Component,
  ElementRef,
  WritableSignal
} from '@angular/core';

import {
  Anchor,
  AnchorMenuComponent,
  ExternalLinkComponent,
  findTitleAnchors
} from '@igo2/sdg-common';
import { Language } from '@igo2/sdg-core';

import { ExampleViewerComponent } from 'projects/demo/src/app/components';
import { AppTranslationService } from 'projects/demo/src/app/config/translation/translation.service';

@Component({
  selector: 'app-anchor-menu',
  imports: [ExampleViewerComponent, AnchorMenuComponent, ExternalLinkComponent],
  templateUrl: './anchor-menu.component.html',
  styleUrl: './anchor-menu.component.scss'
})
export class AnchorMenuDemoComponent implements AfterContentInit {
  anchors: Anchor[] = [];

  constructor(
    private elementRef: ElementRef,
    private translationService: AppTranslationService
  ) {}

  get lang(): WritableSignal<Language> {
    return this.translationService.lang;
  }

  ngAfterContentInit() {
    this.anchors = findTitleAnchors(this.elementRef.nativeElement);
  }
}
