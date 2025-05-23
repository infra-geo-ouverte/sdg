import { Component, OnDestroy, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';

import {
  LateralMenuComponent,
  LateralMenuItem,
  LateralMenuSections
} from '@igo2/sdg-common';
import { SdgRoute, TitleResolverPipe } from '@igo2/sdg-core';

import { Subject, filter, takeUntil } from 'rxjs';

import { SplitScreenComponent } from '../../../components';
import { routes } from './showcases.routes';

@Component({
  selector: 'app-showcases',
  imports: [SplitScreenComponent, RouterOutlet, LateralMenuComponent],
  providers: [TitleResolverPipe],
  templateUrl: './showcases.component.html',
  styleUrl: './showcases.component.scss'
})
export class ShowcasesComponent implements OnDestroy {
  sections: LateralMenuSections;
  title = signal<string | undefined>(undefined);

  private _destroy$ = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleResolverPipe: TitleResolverPipe
  ) {
    this.sections = routes
      .filter((route) => isSection(route))
      .map((item, itemIndex) => {
        const title = this.titleResolverPipe.transform(item);
        if (!title) {
          throw new Error(`Title not found for section ${itemIndex}`);
        }
        return {
          ...item,
          title: title
        };
      });

    this.router.events
      .pipe(
        filter((events) => events instanceof NavigationEnd),
        takeUntil(this._destroy$)
      )
      .subscribe((event) => {
        const { url } = event as NavigationEnd;

        const lastSegment = url.split('/').pop();
        if (lastSegment == null) {
          return;
        }

        const config = routes.find((link) => {
          if (link.path == null) {
            return;
          }
          if (link.path === '') {
            return url === '' || url === '/';
          }
          return url.includes(link.path);
        });

        if (config) {
          this.title.set(this.titleResolverPipe.transform(config));
        }
      });
  }

  get menuTitle(): string {
    return this.activatedRoute.snapshot.title as string;
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}

function isSection(route: SdgRoute): route is LateralMenuItem {
  return !!(route.title && route.path && !route.redirectTo);
}
