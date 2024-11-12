import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { INavigationTitleOptions } from '../navigation.interface';

export const TITLE_OPTIONS = new InjectionToken<INavigationTitleOptions | null>(
  'title.options'
);

@Injectable()
export class NavigationTitleStrategy extends TitleStrategy {
  constructor(
    private readonly title: Title,
    @Inject(TITLE_OPTIONS)
    private options?: INavigationTitleOptions
  ) {
    super();
  }

  override async updateTitle(routerState: RouterStateSnapshot) {
    const { suffix = null, separator = null } = this.options ?? {};

    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.title.setTitle(suffix ? `${title} ${separator} ${suffix}` : title);
    }
  }
}
