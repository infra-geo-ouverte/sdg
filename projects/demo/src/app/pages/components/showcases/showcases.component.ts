import { Component, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

import { SplitScreenComponent } from '@igo2/sdg';
import { TitleResolverPipe } from '@igo2/sdg/core';

import { Subject, filter, takeUntil } from 'rxjs';

import { AppService } from '../../../app.service';
import { routes } from './showcases.routes';

@Component({
  selector: 'app-showcases',
  standalone: true,
  imports: [SplitScreenComponent, RouterOutlet, RouterLink, TitleResolverPipe],
  providers: [TitleResolverPipe],
  templateUrl: './showcases.component.html',
  styleUrl: './showcases.component.scss'
})
export class ShowcasesComponent implements OnDestroy {
  routes = routes.filter((route) => route.redirectTo == null);
  title = signal<string | undefined>(undefined);

  private _destroy$ = new Subject();

  constructor(
    private appService: AppService,
    private router: Router,
    private titleResolverPipe: TitleResolverPipe
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

        if (config) {
          this.title.set(this.titleResolverPipe.transform(config));
        }
      });
  }

  get isHandset() {
    return this.appService.isHandset;
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}
