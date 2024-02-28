import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mono-repo-nav-menu-nav-menu',
  standalone: true,
  imports: [CommonModule,NgClass,RouterModule],
  templateUrl: './nav-menu-nav-menu.component.html',
  styleUrl: './nav-menu-nav-menu.component.css',
})
export class NavMenuNavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
