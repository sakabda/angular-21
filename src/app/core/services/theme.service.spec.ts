import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    // Create a plain instance (no Angular TestBed) for simple unit testing.
    service = new ThemeService();
  });

  it('should initialize with a valid theme', () => {
    expect(['light', 'dark']).toContain(service.active);
  });

  it('should toggle theme', () => {
    const initial = service.active;
    const next = service.toggle();
    expect(next).not.toBe(initial);
    expect(localStorage.getItem('app-theme')).toBe(next);
    // body class should have been applied
    expect(document.body.classList.contains(`${next}-theme`)).toBe(true);
  });

  it('setTheme persists and applies class', () => {
    service.setTheme('dark');
    expect(service.active).toBe('dark');
    expect(localStorage.getItem('app-theme')).toBe('dark');
    expect(document.body.classList.contains('dark-theme')).toBe(true);

    service.setTheme('light');
    expect(service.active).toBe('light');
    expect(localStorage.getItem('app-theme')).toBe('light');
    expect(document.body.classList.contains('light-theme')).toBe(true);
  });

  it('applies Material system variables for dark theme', () => {
    service.setTheme('dark');
    const value = getComputedStyle(document.body).getPropertyValue('--mat-sys-surface').trim();
    expect(value).toBe('#121212');
  });
});
