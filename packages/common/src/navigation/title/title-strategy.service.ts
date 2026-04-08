import { Injectable, InjectionToken, Injector, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TranslationService } from '@igo2/sdg-i18n';

import { INavigationTitleOptions } from '../navigation.interface';

export const TITLE_OPTIONS = new InjectionToken<INavigationTitleOptions | null>(
  'title.options'
);

@Injectable()
export class NavigationTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly injector = inject(Injector);
  private options = inject<INavigationTitleOptions | null>(TITLE_OPTIONS);

  override async updateTitle(routerState: RouterStateSnapshot) {
    const { suffix = null, separator = null } = this.options ?? {};

    const translatedSuffix = this.injector
      ?.get(TranslationService)
      ?.get(suffix as string);
    const effectiveSuffix =
      suffix !== translatedSuffix ? translatedSuffix : suffix;
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.title.setTitle(
        effectiveSuffix ? `${title} ${separator} ${effectiveSuffix}` : title
      );
    }
  }
}
