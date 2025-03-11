import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private _isHandset = signal(false);

  get isHandset(): Signal<boolean> {
    return this._isHandset.asReadonly();
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.handleBreakpoint();
  }

  private handleBreakpoint(): void {
    this.breakpointObserver
      .observe('(max-width: 575px)')
      .subscribe((result) => {
        this._isHandset.set(result.matches);
      });
  }
}
