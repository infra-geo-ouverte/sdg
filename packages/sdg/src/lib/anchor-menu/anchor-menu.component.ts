import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  constructor(private activatedRoute: ActivatedRoute) {}

  anchors: Anchor[] = [];

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.jumpToSection(fragment);
      }
    });

    const elements = document.getElementsByTagName('h2');
    this.anchors = Array.from(elements).map((element) => ({
      text: element.innerText,
      htmlElementId: element.id
    }));
  }

  private jumpToSection(id: string) {
    document.getElementById(id)?.scrollIntoView();
  }
}
