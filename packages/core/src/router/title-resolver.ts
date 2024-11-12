import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  Route,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export abstract class TitleResolver<T> implements Resolve<T> {
  abstract resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<T>;
  abstract resolveStatic(route: Route): string | undefined;
}
