import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  inject,
  input
} from '@angular/core';

import {
  BreadcrumbsWithRouterComponent,
  CharterBannerComponent
} from '@igo2/sdg-common';
import { Language, TranslationService } from '@igo2/sdg-i18n';

@Component({
  selector: 'app-split-screen',
  imports: [BreadcrumbsWithRouterComponent, CharterBannerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './split-screen.component.html',
  styleUrl: './split-screen.component.scss',
  // Prevents the `title` input from leaking as a native title attribute (native tooltip) on the host element
  host: { '[attr.title]': 'null' }
})
export class SplitScreenComponent {
  private translationService = inject(TranslationService);

  readonly title = input<string>();
  readonly showCharterBanner = input<boolean>(false);

  get lang(): WritableSignal<Language> {
    return this.translationService.lang;
  }
}
