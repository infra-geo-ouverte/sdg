import { Injectable, signal } from '@angular/core';

export type PanelType = 'custom' | 'search' | 'legend' | (string & {});

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  type = signal<PanelType>('custom');
  expanded = signal(false);
  visibleHeight = signal(0);

  toggle(type?: PanelType): void {
    if (type && type !== this.type()) {
      this.type.set(type);
      this.expanded.set(true);
    } else {
      this.expanded.update((value) => !value);
    }
  }
}
