import { NgFor } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';

import { INavigationRoute, SplitScreenComponent } from '@igo2/sdg';

import { Subject, filter, takeUntil } from 'rxjs';

import { AppService } from '../../../app.service';
import { ExternalLinkComponent } from '../../../components/external-link/external-link.component';
import { routes } from './showcases.routes';

@Component({
  selector: 'app-showcases',
  standalone: true,
  imports: [NgFor, SplitScreenComponent, RouterOutlet, ExternalLinkComponent],
  templateUrl: './showcases.component.html',
  styleUrl: './showcases.component.scss'
})
export class ShowcasesComponent implements OnDestroy {
  routes = routes.filter((route) => route.redirectTo == null);
  selectedRoute = signal<INavigationRoute | undefined>(undefined);

  get isHandset() {
    return this.appService.isHandset;
  }

  private _destroy$ = new Subject();

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

        this.selectedRoute.set(config);
      });
  }

  handleNavigation(route: INavigationRoute) {
    this.router.navigate([route.path], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}
