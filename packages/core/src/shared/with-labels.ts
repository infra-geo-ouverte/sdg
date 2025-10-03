import { Directive, InjectionToken, inject, model } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Labels = Record<string, any>;

@Directive()
export class WithLabels<T extends Labels> {
  labels = model<T>({} as T);

  constructor(defaultLabels: T | undefined, labelsToken: InjectionToken<T>) {
    this.setLabels(defaultLabels, labelsToken);
  }

  private setLabels(defaultLabels: T | undefined, token: InjectionToken<T>) {
    const labelsOverride = inject(token, { optional: true });
    if (labelsOverride) {
      this.labels.update((value) => ({
        ...(defaultLabels ?? {}),
        ...labelsOverride,
        ...value
      }));
    }
  }
}
