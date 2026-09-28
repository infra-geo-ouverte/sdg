import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  styleUrls: ['./tile.component.scss'],
  // Prevents the `title` input from leaking as a native title attribute (native tooltip) on the host element
  host: { '[attr.title]': 'null' }
})
export class TileComponent {
  private router = inject(Router);

  readonly icon = input<string>();
  /** The icon needs to be registred via the MatIconRegistry */
  readonly iconSvg = input<string>();

  readonly title = input.required<string>();
  readonly message = input<string, string>('', {
    transform: this.messageValidation
  });
  readonly href = input.required<string>();
  /** Official specs mention that the title should not exceed 45 characters long, but this can be ignored if necessary */
  readonly ignoreTitleValidation = input<boolean>(false);

  protected readonly validatedTitle = computed(() => {
    const title = this.title();
    return title.length > 45 && !this.ignoreTitleValidation()
      ? `${title.slice(0, 45)}...`
      : title;
  });

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
