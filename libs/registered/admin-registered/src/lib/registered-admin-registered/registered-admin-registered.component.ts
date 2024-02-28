import { Component,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavMenuSideNavMenuComponent} from '../../../../../nav-menu/side-nav-menu/src/lib/nav-menu-side-nav-menu/nav-menu-side-nav-menu.component';
import { RouterModule } from '@angular/router';
import {NavMenuTopMenuComponent} from '@mono-repo/nav-menu/top-menu';
import {CoursesService} from '../../../../../view-component/service/courses.service';
import {AuthserviceService} from '../../../../../user/services/authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import{ResetPasswordService} from '../../../../../password-reset/services/reset-password.service';
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'mono-repo-registered-admin-registered',
  standalone: true,
  imports: [CommonModule,NavMenuSideNavMenuComponent,NavMenuTopMenuComponent,RouterModule,ReactiveFormsModule,FormsModule,MatTableModule],
  templateUrl: './registered-admin-registered.component.html',
  styleUrl: './registered-admin-registered.component.css',
  providers:[CoursesService,AuthserviceService,ResetPasswordService]
})
export class RegisteredAdminRegisteredComponent implements OnInit{
  schedule: any;
  sideNavStatus: boolean = false;
  displayedColumn1: string[] = ['code', 'instructor', 'day', 'stime', 'etime', 'max', 'current', 'deadLine'];
  displayedColumns: string[] = ['code', 'instructor', 'firstname', 'lastname', 'day', 'stime', 'etime','Cancel'];
  searchSched: any;
  user: any;
  @Input() search: string = '';

  constructor(private serv: CoursesService, private servAuth: AuthserviceService, private snackBar: MatSnackBar, private rserv: ResetPasswordService) { }



  ngOnInit() {
    this.user = this.servAuth.loadCurrentUser();
    this.serv.RegisteredStudents().subscribe((res) => {
      this.schedule = res;
      this.searchSched = res;
    });

  }



  onSearch(value: string) {
    value = value.toLowerCase();
    this.searchSched = null;
    if (value.length > 0) {
      this.searchSched = this.schedule.filter((c: { schedule: { instructor: string; courseId: string; }; student: { firstname: string; }; }) =>
        c.schedule.instructor.toLowerCase().includes(value) ||
        c.schedule.courseId.toLowerCase().includes(value) ||
        c.student.firstname.toLowerCase().includes(value)

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

  cancel(code: any,id:any,email:string) {
    if (confirm("Are you sure ,Do you want to unenroll ?")) {
      this.serv.unEnroll(id,code).subscribe((res) => {
        if (res == 'Success') {
          this.openSnackBar("Successfully unenrolled", 'success-snackbar');
          this.rserv.send(email);
          console.log(email);
          this.ngOnInit();
        }
        else {
          this.openSnackBar("Failed", 'error-snackbar');
        }
      });
    }
  }
}
