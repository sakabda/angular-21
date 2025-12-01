// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {
  // Inject ThemeService here to ensure the service initializes early and applies
  // the chosen theme to the document body when the app boots.
  constructor(_theme: ThemeService) {}
}
