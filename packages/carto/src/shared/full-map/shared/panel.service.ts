import { Injectable, signal } from '@angular/core';

export type PanelType = 'search' | 'legend' | string;

const DEFAULT_PANEL_TYPE: PanelType = 'search';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  defaultType = signal<PanelType>(DEFAULT_PANEL_TYPE);
  readonly type = signal<PanelType>(DEFAULT_PANEL_TYPE);
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

  setType(type: PanelType): void {
    this.type.set(type);
  }

  setDefaultType(type: PanelType): void {
    this.defaultType.set(type);
    this.setType(type);
  }

  resetDefaultType(): void {
    this.setType(this.defaultType());
  }
}
