import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  InjectionToken,
  OnInit,
  inject,
  input
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { WithLabels } from '@igo2/sdg-core';

import { Anchor, AnchorMenuLabels } from './anchor-menu.interface';

export const SDG_ANCHOR_MENU_LABELS = new InjectionToken<AnchorMenuLabels>(
  'SDG_ANCHOR_MENU_LABELS'
);

const DEFAULT_LABELS: AnchorMenuLabels = {
  title: 'Dans cette page :'
};

@Component({
  selector: 'sdg-anchor-menu',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './anchor-menu.component.html',
  styleUrls: ['./anchor-menu.component.scss']
})
export class AnchorMenuComponent
  extends WithLabels<AnchorMenuLabels>
  implements OnInit
{
  private activatedRoute = inject(ActivatedRoute);
  private document = inject<Document>(DOCUMENT);

  readonly anchors = input.required<Anchor[]>();

  constructor() {
    super(DEFAULT_LABELS, SDG_ANCHOR_MENU_LABELS);
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
