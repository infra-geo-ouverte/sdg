import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  Route,
  RouterStateSnapshot
} from '@angular/router';

export abstract class TitleResolver<T = string> implements Resolve<T> {
  abstract resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<T>;
  abstract resolveStatic(route: Route): string | undefined;
}
