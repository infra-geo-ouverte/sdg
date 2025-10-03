import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { WithLabels } from '@igo2/sdg-core';

import {
  ISequentialLinksLabels,
  SequentialLink
} from './sequential-links.interface';

export const SDG_SEQUENTIAL_LINKS_LABELS =
  new InjectionToken<ISequentialLinksLabels>('SDG_SEQUENTIAL_LINKS_LABELS');

const DEFAULT_LABELS: ISequentialLinksLabels = {
  previous: 'Précédent',
  next: 'Suivant'
};

@Component({
  selector: 'sdg-sequential-links',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sequential-links.component.html',
  styleUrls: ['./sequential-links.component.scss']
})
export class SequentialLinksComponent extends WithLabels<ISequentialLinksLabels> {
  readonly previousLink = input<SequentialLink>();
  readonly nextLink = input<SequentialLink>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(DEFAULT_LABELS, SDG_SEQUENTIAL_LINKS_LABELS);
  }

  goToLink(url: string) {
    this.router.navigate(['../', url], { relativeTo: this.activatedRoute });
  }
}
