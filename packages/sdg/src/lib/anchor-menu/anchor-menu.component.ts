import { NgFor, NgIf } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  input
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Anchor } from './anchor-menu.interface';

@Component({
  selector: 'sdg-anchor-menu',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './anchor-menu.component.html',
  styleUrls: ['./anchor-menu.component.scss']
})
export class AnchorMenuComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  anchors = input.required<Anchor[]>();

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
