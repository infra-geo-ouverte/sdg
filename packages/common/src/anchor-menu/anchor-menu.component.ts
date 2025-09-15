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

import { Anchor, AnchorMenuLabels } from './anchor-menu.interface';

export const SDG_ANCHOR_MENU_LABELS = new InjectionToken<AnchorMenuLabels>(
  'SDG_ANCHOR_MENU_LABELS'
);

@Component({
  selector: 'sdg-anchor-menu',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './anchor-menu.component.html',
  styleUrls: ['./anchor-menu.component.scss']
})
export class AnchorMenuComponent implements OnInit {
  readonly anchors = input.required<Anchor[]>();

  title = 'Dans cette page :';

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    const labelsOverride = inject(SDG_ANCHOR_MENU_LABELS, { optional: true });
    if (labelsOverride) {
      this.title = labelsOverride.title;
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
