import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  inject,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { SeeAlsoLabels, SeeAlsoLinks } from './see-also.interface';

export const SDG_SEE_ALSO_LABELS = new InjectionToken<SeeAlsoLabels>(
  'SDG_SEE_ALSO_LABELS'
);

@Component({
  selector: 'sdg-see-also',
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './see-also.component.html',
  styleUrls: ['./see-also.component.scss']
})
export class SeeAlsoComponent {
  readonly links = input.required<SeeAlsoLinks>();
  readonly files = input<SeeAlsoLinks>([]);

  title = 'À consulter aussi';

  constructor() {
    const labelsOverride = inject(SDG_SEE_ALSO_LABELS, { optional: true });
    if (labelsOverride) {
      this.title = labelsOverride.title;
    }
  }
}
