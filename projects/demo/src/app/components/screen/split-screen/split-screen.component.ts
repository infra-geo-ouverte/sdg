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
import { Language } from '@igo2/sdg-core';

import { AppTranslationService } from '../../../config/translation/translation.service';

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

  constructor(private translationService: AppTranslationService) {}

  get lang(): WritableSignal<Language> {
    return this.translationService.lang;
  }
}
