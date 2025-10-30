import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { WithLabels } from '@igo2/sdg-core';

import { ISeeAlsoLabels, SeeAlsoLinks } from './see-also.interface';

export const SDG_SEE_ALSO_LABELS = new InjectionToken<ISeeAlsoLabels>(
  'SDG_SEE_ALSO_LABELS'
);

const DEFAULT_LABELS: ISeeAlsoLabels = {
  title: 'À consulter aussi'
};

@Component({
  selector: 'sdg-see-also',
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './see-also.component.html',
  styleUrls: ['./see-also.component.scss']
})
export class SeeAlsoComponent extends WithLabels<ISeeAlsoLabels> {
  readonly links = input.required<SeeAlsoLinks>();
  readonly files = input<SeeAlsoLinks>([]);

  constructor() {
    super(DEFAULT_LABELS, SDG_SEE_ALSO_LABELS);
  }
}
