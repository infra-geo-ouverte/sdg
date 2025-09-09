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
  selector: 'app-basic-screen',
  imports: [BreadcrumbsWithRouterComponent, CharterBannerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-screen.component.html',
  styleUrl: './basic-screen.component.scss'
})
export class BasicScreenComponent {
  readonly title = input.required<string>();
  readonly showCharterBanner = input<boolean>(false);

  constructor(private translationService: TranslationService) {}

  get lang(): WritableSignal<Language> {
    return this.translationService.lang;
  }
}
