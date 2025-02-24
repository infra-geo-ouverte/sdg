import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { SequentialLink } from './sequential-links.interface';

@Component({
  selector: 'sdg-sequential-links',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sequential-links.component.html',
  styleUrls: ['./sequential-links.component.scss']
})
export class SequentialLinksComponent {
  previous = input<SequentialLink>();
  next = input<SequentialLink>();
  isHandset = input<boolean>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  goToLink(url: string) {
    this.router.navigate(['../', url], { relativeTo: this.activatedRoute });
  }
}
