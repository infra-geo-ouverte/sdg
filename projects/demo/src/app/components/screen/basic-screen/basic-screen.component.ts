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
  selector: 'app-basic-screen',
  imports: [BreadcrumbsWithRouterComponent, CharterBannerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-screen.component.html',
  styleUrl: './basic-screen.component.scss'
})
export class BasicScreenComponent {
  readonly title = input.required<string>();
  readonly showCharterBanner = input<boolean>(false);

  constructor(private translationService: AppTranslationService) {}

  get lang(): WritableSignal<Language> {
    return this.translationService.lang;
  }
}
