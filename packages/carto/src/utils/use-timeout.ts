import { signal } from '@angular/core';

export type IUseTimeout = { set: () => void; clear: () => void };

export function useTimeout(callback: () => void, delay: number): IUseTimeout {
  const previousTimeout = signal<number>(0);

  return {
    set: () => {
      if (previousTimeout()) {
        clearTimeout(previousTimeout());
      }

      const id = setTimeout(() => {
        callback();
      }, delay) as never as number;

      previousTimeout.set(id);
    },
    clear: () => {
      clearTimeout(previousTimeout());
    }
  };
}
