import { Component ,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthserviceService} from '../../../../../user/services/authservice.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'mono-repo-nav-menu-top-menu',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './nav-menu-top-menu.component.html',
  styleUrl: './nav-menu-top-menu.component.css',
  providers:[AuthserviceService]
})
export class NavMenuTopMenuComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Output() searchEvent = new EventEmitter<string>();
 
  menuStatus: boolean = false;
  search: string = '';

  constructor(private auth: AuthserviceService, private router: Router) { }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.auth.removeToken();
    this.router.navigateByUrl('/signin');
  }
  sideNavToggle() {
    this.menuStatus =  !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);

  }

  nav() {
    this.router.navigateByUrl("signin/profile");
  }

  searchh(par:any) {
    console.log(par);
    this.search=par
    this.searchEvent.emit(this.search)
  }
}
