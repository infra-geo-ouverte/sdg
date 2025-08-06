import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  inject,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import {
  SequentialLink,
  SequentialLinksLabels
} from './sequential-links.interface';

export const SDG_SEQUENTIAL_LINKS_LABELS =
  new InjectionToken<SequentialLinksLabels>('SDG_SEQUENTIAL_LINKS_LABELS');

@Component({
  selector: 'sdg-sequential-links',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sequential-links.component.html',
  styleUrls: ['./sequential-links.component.scss']
})
export class SequentialLinksComponent {
  readonly previousLink = input<SequentialLink>();
  readonly nextLink = input<SequentialLink>();

  previous = 'Précédent';
  next = 'Suivant';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const labelsOverride = inject(SDG_SEQUENTIAL_LINKS_LABELS);
    if (labelsOverride) {
      this.previous = labelsOverride.previous;
      this.next = labelsOverride.next;
    }
  }

  goToLink(url: string) {
    this.router.navigate(['../', url], { relativeTo: this.activatedRoute });
  }
}
