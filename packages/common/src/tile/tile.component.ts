import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'sdg-tile',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  private router = inject(Router);

  readonly icon = input<string>();
  readonly title = input.required<string, string>({
    transform: this.titleValidation
  });
  readonly message = input<string>();
  readonly href = input.required<string>();

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
