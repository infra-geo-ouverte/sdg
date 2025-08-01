import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { Language } from '@igo2/sdg-core';

import { SeeAlsoLinks } from './see-also.interface';

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
  readonly language = input<Language>('fr');
}
