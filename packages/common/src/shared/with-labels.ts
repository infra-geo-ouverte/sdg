import {
  Directive,
  InjectionToken,
  Signal,
  computed,
  inject,
  model
} from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Labels = Record<string, any>;

@Directive()
export class WithLabels<T extends Labels> {
  labelsToken: T | null;
  defaultLabels: T | null;

  readonly modeLabels = model<Partial<T> | null | undefined>({} as T, {
    alias: 'labels'
  });

  /**
   * Labels merged from defaults, injection token, and input binding.
   * Priority (highest wins): input binding > injection token > defaults.
   */
  readonly labels: Signal<T>;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(defaultLabels: T | undefined, labelsToken: InjectionToken<T>) {
    this.defaultLabels = defaultLabels ?? null;
    this.labelsToken = inject(labelsToken, { optional: true });
    this.labels = computed(() =>
      this.mergeLabels(this.defaultLabels, this.labelsToken, this.modeLabels())
    );
  }

  private mergeLabels(
    defaults: T | null,
    token: T | null | undefined,
    input: Partial<T> | null | undefined
  ): T {
    return {
      ...(defaults ?? {}),
      ...(token ?? {}),
      ...(input ?? {})
    } as T;
  }
}
