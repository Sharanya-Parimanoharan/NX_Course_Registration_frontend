import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavMenuNavMenuComponent}  from '../../../../../libs/nav-menu/nav-menu/src/lib/nav-menu-nav-menu/nav-menu-nav-menu.component';
import { FooterComponent } from '../../../../../libs/footer/src/lib/footer/footer.component';
@Component({
  selector: 'mono-repo-about',
  standalone: true,
  imports: [CommonModule,NavMenuNavMenuComponent,FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
