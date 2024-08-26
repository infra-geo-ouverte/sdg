import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { IgoLanguageModule } from '@igo2/core/language';

import { environment } from 'projects/demo/src/environments/environment';

@Component({
  selector: 'sdg-tile',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, IgoLanguageModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  constructor(private router: Router) {}

  icon = input<string>();
  title = input.required<string, string>({
    transform: this.titleValidation
  });
  message = input<string>();
  href = input.required<string>();
  isHandset = input<boolean>();

  private titleValidation(title: string): string {
    if (title.length > 45) {
      if (!environment.production) {
        console.error('Tile title should not be longer than 45 characters');
      }
      return `${title.slice(0, 45)}...`;
    }

    return title;
  }

  goToLink() {
    const regex: RegExp = /^https?:\/\//;
    regex.test(this.href())
      ? window.open(this.href(), '_blank')
      : this.router.navigate([this.href()]);
  }
}
