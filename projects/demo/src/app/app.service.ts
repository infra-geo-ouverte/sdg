import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly isDarkMode = signal(false);

  constructor() {}

  toggleDarkMode(document: Document) {
    const isDark = this.isDarkMode();

    document.body.classList[isDark ? 'remove' : 'add']('dark-mode');
    document.documentElement.style.setProperty(
      'color-scheme',
      isDark ? 'light' : 'dark'
    );
    this.isDarkMode.update((value) => !value);
  }
}
