import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LateralMenuService {
  opened = signal<boolean>(false);

  close(): void {
    this.opened.set(false);
  }

  toggle(): void {
    this.opened.update((value) => !value);
  }
}
