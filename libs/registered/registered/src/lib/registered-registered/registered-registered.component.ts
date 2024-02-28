import { Component ,Input,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import {NavMenuSideNavMenuComponent} from '../../../../../nav-menu/side-nav-menu/src/lib/nav-menu-side-nav-menu/nav-menu-side-nav-menu.component';
import { RouterModule } from '@angular/router';
import {NavMenuTopMenuComponent} from '@mono-repo/nav-menu/top-menu';
import {CoursesService} from '../../../../../view-component/service/courses.service';
import {AuthserviceService} from '../../../../../user/services/authservice.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'mono-repo-registered-registered',
  standalone: true,
  imports: [CommonModule,MatTableModule,ReactiveFormsModule,NavMenuSideNavMenuComponent,RouterModule,NavMenuTopMenuComponent,FormsModule],
  templateUrl: './registered-registered.component.html',
  styleUrl: './registered-registered.component.css',
  providers:[AuthserviceService,CoursesService]
})
export class RegisteredRegisteredComponent implements OnInit {
  schedule: any;
  sideNavStatus: boolean = false;
  //displayedColumn1: string[] = ['code', 'instructor', 'day', 'stime', 'etime', 'max', 'current', 'deadLine'];
  displayedColumns: string[] = ['code', 'instructor', 'day', 'stime', 'etime', 'max', 'current', 'deadLine', 'Cancel'];
  searchSched: any;
  user: any;
  @Input() search: string = '';

  constructor(private serv: CoursesService, private servAuth: AuthserviceService, private snackBar: MatSnackBar) { }



  ngOnInit() {
    this.user = this.servAuth.loadCurrentUser();
    this.serv.Registered(this.user.id).subscribe((res) => {
      this.schedule = res;
      this.searchSched = res;
      console.log(this.searchSched);
    });
  

  }

  

  onSearch(value: string) {
    value = value.toLowerCase();
    this.searchSched = null;
    if (value.length > 0) {
      this.searchSched = this.schedule.filter((c: { schedule: { instructor: string; courseId: string; }; }) =>
        c.schedule.instructor.toLowerCase().includes(value) ||
        c.schedule.courseId.toLowerCase().includes(value)
      );

      console.log(this.searchSched);

    }
    else {
      this.ngOnInit();
    }
  }




  private openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }

  cancel(code: string) {
    if (confirm("Are you sure ,Do you want to unenroll ?")) {
      this.serv.unEnroll(code, this.user.id).subscribe((res) => {
        if (res == 'Success') {
          this.openSnackBar("Successfully unenrolled", 'success-snackbar')
          this.ngOnInit();
        }
        else {
          this.openSnackBar("Failed", 'error-snackbar');
        }
      });
    }
  }
}
