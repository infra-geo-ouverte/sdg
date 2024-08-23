import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IgoLanguageModule } from '@igo2/core/language';

@Component({
  selector: 'sdg-tile',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, IgoLanguageModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  icon = input<string>();
  title = input.required<string>();
  message = input<string>();
  href = input.required<string>();
  isHandset = input<boolean>();

  goToLink() {
    window.open(this.href(), '_blank');
  }
}
