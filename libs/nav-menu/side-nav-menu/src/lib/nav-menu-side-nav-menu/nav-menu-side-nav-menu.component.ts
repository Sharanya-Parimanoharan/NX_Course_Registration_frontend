import { Component ,Input, OnInit} from '@angular/core';
import { CommonModule,NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import {AuthserviceService} from '../../../../../user/services/authservice.service';
import { HttpClientModule } from '@angular/common/http';
import {PopupsAddCourseComponent} from '@mono-repo/popups/add-course';
import {PopupsAddScheduleComponent} from '@mono-repo/popups/add-schedule';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'mono-repo-nav-menu-side-nav-menu',
  standalone: true,
  imports: [NgClass,PopupsAddScheduleComponent,PopupsAddCourseComponent,CommonModule,HttpClientModule,MatDialogModule],
  templateUrl: './nav-menu-side-nav-menu.component.html',
  styleUrls: ['./nav-menu-side-nav-menu.component.css'],
  providers:[AuthserviceService]
})
export class NavMenuSideNavMenuComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;
  list: any;
  user: any;

  constructor(private dialog: MatDialog, private router: Router, private authserv: AuthserviceService) { }

  list1 = [
    {
      number: '1',
      name: 'Add Courses',
      icon: "fa-solid fa-book",
    },
    {
      number: '2',
      name: 'Add Schedules',
      icon: "fa-regular fa-calendar-plus",
    },
    {
      number: '3',
      name: 'View Courses',
      icon: "fa-regular fa-eye",
      //path:'signin/courses'
    },
    {
      number: '4',
      name: 'View Schedules',
      icon:"fa-solid fa-calendar-days"
    },
    {
      number: '5',
      name: 'Registered Students',
      icon:"fa-solid fa-people-group"
    },
   /* {
      number: '6',
      name: 'Users',
      icon: "fa-solid fa-people-group"
    },**/
  ];

  list2 = [
  
    {
      number: '3',
      name: 'View Courses',
      icon: "fa-regular fa-eye",
      //path:'signin/courses'
    },
    {
      number: '4',
      name: 'View Schedules',
      icon: "fa-solid fa-calendar-days"
    },
    {
      number: '5',
      name: 'Registered Courses',
      icon: "fa-solid fa-people-group"
    },
  ];


  ngOnInit() {
      this.user = this.authserv.loadCurrentUser();
    if (this.user.role == "Admin") {
      this.list = this.list1;
    }
    else {
     this.list = this.list2;
    } 

  }

  openDialog(name: string) {
    if (name == 'Add Courses') {
       this.dialog.open(PopupsAddCourseComponent, {
         width: '250px',
         data: "right click"
       });
    
    }
    if (name == 'Add Schedules') {
       this.dialog.open(PopupsAddScheduleComponent, {
         width: '550px',
         data: "right click"
       });
    }
    if (name == 'View Courses') {
      this.router.navigateByUrl('signin/courses');
    }
    if (name == 'View Schedules') {
      this.router.navigateByUrl('signin/schedules');
    }
    if (name == 'Registered Students') {
      this.router.navigateByUrl('signin/students');
    }
    if (name == 'Registered Courses') {
      this.router.navigateByUrl('signin/registered');
    }
    if (name == 'Users') {
      this.router.navigateByUrl('signin/students');
    }

  }
}
