import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule
} from '@angular/router';

import { Subject, filter, takeUntil } from 'rxjs';

import { TitleResolver } from '../router';
import { BreadcrumbsBase } from './breadcrumbs-base';
import { BreadcrumbsListComponent } from './breadcrumbs-list/breadcrumbs-list.component';
import { getBreadcrumbsFromRouterSegments } from './breadcrumbs-with-router.utils';
import { Breadcrumbs } from './shared/breadcrumbs.interface';

@Component({
  selector: 'sdg-breadcrumbs-with-router',
  imports: [RouterModule, BreadcrumbsListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<sdg-breadcrumbs-list [breadcrumbs]="breadcrumbsList()" />`,
  styles: `
    :host {
      display: block;

      &.d-none {
        display: none;
      }
    }
  `,
  host: {
    '[class.d-none]': '!hasBreadcrumbs()'
  }
})
export class BreadcrumbsWithRouterComponent
  extends BreadcrumbsBase
  implements OnInit, OnDestroy
{
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private titleResolver = inject(TitleResolver, { optional: true });

  breadcrumbs = signal<Breadcrumbs>([]);

  private _takeUntil = new Subject<boolean>();

  ngOnInit(): void {
    const breads = this.getBreadsFromRouterSegments();
    this.breadcrumbs.set(breads);

    this.router.events
      .pipe(
        filter((events) => events instanceof NavigationEnd),
        takeUntil(this._takeUntil)
      )
      .subscribe(() => {
        const breads = this.getBreadsFromRouterSegments();
        this.breadcrumbs.set(breads);
      });
  }

  ngOnDestroy(): void {
    this._takeUntil.next(true);
  }

  private getBreadsFromRouterSegments(): Breadcrumbs {
    return getBreadcrumbsFromRouterSegments({
      activatedRoute: this.activatedRoute,
      routerConfig: this.router.config,
      titleResolver: this.titleResolver
    });
  }
}
