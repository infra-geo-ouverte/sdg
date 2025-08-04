import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  inject,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { SeeAlsoLinks } from './see-also.interface';

export const SDG_SEE_ALSO_LABELS = new InjectionToken<string>(
  'SDG_SEE_ALSO_LABELS'
);

const TITLE = 'À consulter aussi';

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

  title = TITLE;

  constructor() {
    const labelsOverride = inject(SDG_SEE_ALSO_LABELS);
    if (labelsOverride) {
      this.title = labelsOverride;
    }
  }
}
