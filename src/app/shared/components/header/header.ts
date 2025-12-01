import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(public themeService: ThemeService) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}
