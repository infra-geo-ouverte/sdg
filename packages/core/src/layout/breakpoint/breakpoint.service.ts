import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  isHandset = signal(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.handleBreakpoint();
  }

  private handleBreakpoint(): void {
    this.breakpointObserver
      .observe(Breakpoints.HandsetPortrait)
      .subscribe((result) => {
        this.isHandset.set(result.matches);
      });
  }
}
