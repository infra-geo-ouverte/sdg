import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  OnInit,
  inject,
  input
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Anchor } from './anchor-menu.interface';

export const SDG_ANCHOR_MENU_LABELS = new InjectionToken<string>(
  'SDG_ANCHOR_MENU_LABELS'
);

const TITLE = 'Dans cette page :';

@Component({
  selector: 'sdg-anchor-menu',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './anchor-menu.component.html',
  styleUrls: ['./anchor-menu.component.scss']
})
export class AnchorMenuComponent implements OnInit {
  readonly anchors = input.required<Anchor[]>();

  title = TITLE;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    const labelsOverride = inject(SDG_ANCHOR_MENU_LABELS);
    if (labelsOverride) {
      this.title = labelsOverride;
    }
  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.jumpToSection(fragment);
      }
    });
  }

  private jumpToSection(id: string) {
    this.document.getElementById(id)?.scrollIntoView();
  }
}
