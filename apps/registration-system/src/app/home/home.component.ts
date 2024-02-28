import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {NavMenuNavMenuComponent}  from '../../../../../libs/nav-menu/nav-menu/src/lib/nav-menu-nav-menu/nav-menu-nav-menu.component';
import {FooterComponent}  from '../../../../../libs/footer/src/lib/footer/footer.component';

@Component({
  selector: 'mono-repo-home',
  standalone: true,
  imports: [CommonModule,NavMenuNavMenuComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) { }

  navigate() {
    this.router.navigateByUrl("/signin");
  }
}
