import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SequentialLink } from './sequential-links.interface';

@Component({
  selector: 'sdg-sequential-links',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sequential-links.component.html',
  styleUrls: ['./sequential-links.component.scss']
})
export class SequentialLinksComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  previous = input<SequentialLink>();
  next = input<SequentialLink>();
  isHandset = input<boolean>();

  goToLink(url: string) {
    this.router.navigate(['../', url], { relativeTo: this.activatedRoute });
  }
}
