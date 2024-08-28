import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { IgoLanguageModule } from '@igo2/core/language';

import { Link } from './link.interface';

@Component({
  selector: 'sdg-consult',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, IgoLanguageModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent {
  constructor() {}

  links = input.required<Link[]>();
  files = input<Link[]>([]);
}
