import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
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
  styleUrl: './split-screen.component.scss'
})
export class SplitScreenComponent {
  readonly title = input<string>();
  readonly showCharterBanner = input<boolean>(false);

  constructor(private translationService: TranslationService) {}

  get lang(): WritableSignal<Language> {
    return this.translationService.lang;
  }
}
