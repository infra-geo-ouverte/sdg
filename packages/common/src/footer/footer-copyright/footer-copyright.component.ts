import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';

import { FooterCopyright } from '../footer.interface';

@Component({
  selector: 'sdg-footer-copyright',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-copyright.component.html',
  styleUrls: ['./footer-copyright.component.scss']
})
export class FooterCopyrightComponent {
  readonly copyright = input.required<FooterCopyright>();
  readonly containerClass = input<string>();

  readonly url = computed(
    () => this.copyright().copyrightUrl || 'https://www.quebec.ca/droit-auteur'
  );
  readonly year = computed(
    () => this.copyright().year || new Date().getFullYear()
  );
}
