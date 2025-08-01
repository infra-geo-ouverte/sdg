import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { Language } from '@igo2/sdg-core';

import { SequentialLink } from './sequential-links.interface';

@Component({
  selector: 'sdg-sequential-links',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sequential-links.component.html',
  styleUrls: ['./sequential-links.component.scss']
})
export class SequentialLinksComponent {
  readonly previous = input<SequentialLink>();
  readonly next = input<SequentialLink>();
  readonly language = input<Language>('fr');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  goToLink(url: string) {
    this.router.navigate(['../', url], { relativeTo: this.activatedRoute });
  }
}
