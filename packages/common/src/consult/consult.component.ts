import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ConsultLinks } from './consult.interface';

@Component({
  selector: 'sdg-consult',
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent {
  readonly links = input.required<ConsultLinks>();
  readonly files = input<ConsultLinks>([]);
}
