import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'sdg-tile',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule],
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
    return title.length > 45 ? `${title.slice(0, 45)}...` : title;
  }

  goToLink() {
    const regex = /^https?:\/\//;
    regex.test(this.href())
      ? window.open(this.href(), '_blank')
      : this.router.navigate([this.href()]);
  }
}
