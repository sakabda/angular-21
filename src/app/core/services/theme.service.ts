import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'app-theme';
  private theme: Theme = 'light';

  constructor() {
    // Initialize theme from persisted preference or system preference
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    if (saved) {
      this.setTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  get active(): Theme {
    return this.theme;
  }

  isDark(): boolean {
    return this.theme === 'dark';
  }

  toggle(): Theme {
    const next: Theme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    localStorage.setItem(this.storageKey, theme);

    // Apply class on document body
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);

    // Update color-scheme for proper form element rendering at OS level
    body.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
  }
}
