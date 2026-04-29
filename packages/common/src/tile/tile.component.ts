import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { pathIsExternal } from '../router';

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
  /** The icon needs to be registred via the MatIconRegistry */
  readonly iconSvg = input<string>();

  readonly title = input.required<string, string>({
    transform: this.titleValidation
  });
  readonly message = input<string, string>('', {
    transform: this.messageValidation
  });
  readonly href = input.required<string>();

  private titleValidation(title: string): string {
    return title.length > 45 ? `${title.slice(0, 45)}...` : title;
  }

  private messageValidation(message: string): string {
    return message.length > 140 ? `${message.slice(0, 140)}...` : message;
  }

  goToLink() {
    const href = this.href();
    pathIsExternal(href)
      ? window.open(href, '_blank')
      : this.router.navigate([href]);
  }
}
