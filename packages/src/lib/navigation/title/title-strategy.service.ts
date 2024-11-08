import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { LanguageService } from '@igo2/core/language';

import { firstValueFrom } from 'rxjs';

import { INavigationTitleOptions } from '../navigation.interface';

export const TITLE_OPTIONS = new InjectionToken<INavigationTitleOptions | null>(
  'title.options'
);

@Injectable()
export class NavigationTitleStrategy extends TitleStrategy {
  constructor(
    private readonly title: Title,
    private languageService: LanguageService,
    @Inject(TITLE_OPTIONS)
    private options?: INavigationTitleOptions
  ) {
    super();
  }

  override async updateTitle(routerState: RouterStateSnapshot) {
    const { suffix = null, separator = null } = this.options ?? {};

    let title = this.buildTitle(routerState);

    if (title !== undefined) {
      title = await this.translateTitle(title);
      this.title.setTitle(suffix ? `${title} ${separator} ${suffix}` : title);
    }
  }

  private translateTitle(title: string): Promise<string> {
    return firstValueFrom(this.languageService.translate.get(title));
  }
}
