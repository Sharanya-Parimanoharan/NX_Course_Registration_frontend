import { Component,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup ,ReactiveFormsModule,FormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthserviceService} from '../../../../../user/services/authservice.service';
import {CoursesService} from '../../../../service/courses.service';
import {NavMenuSideNavMenuComponent} from '@mono-repo/nav-menu/side-nav-menu';
import { RouterModule } from '@angular/router';
import {NavMenuTopMenuComponent} from '@mono-repo/nav-menu/top-menu';
import { MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mono-repo-view-component-view-schedules',
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule,MatInputModule,CommonModule,RouterModule,ReactiveFormsModule,NavMenuSideNavMenuComponent,NavMenuTopMenuComponent,MatTableModule,HttpClientModule,FormsModule],
  templateUrl: './view-component-view-schedules.component.html',
  styleUrl: './view-component-view-schedules.component.css',
  providers:[CoursesService,AuthserviceService]
})
export class ViewComponentViewSchedulesComponent implements OnInit {
  schedule: any;
  sideNavStatus: boolean = false;
  displayedColumn1: string[] = ['code', 'instructor', 'day', 'stime', 'etime', 'max', 'current', 'deadLine', 'delete'];
  displayedColumn2: string[] = ['code', 'instructor', 'day', 'stime', 'etime', 'max', 'current', 'deadLine', 'Register'];
  searchSched: any;
  user: any;
  displayedColumns: string[] | undefined;
  date!: Date | '';
  deadLine: any;
  @Input() search: string = '';

  constructor(private serv: CoursesService, private servAuth: AuthserviceService, private snackBar: MatSnackBar) { }

  frm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    stime: new FormControl(''),
    etime: new FormControl(''),
    day: new FormControl(''),
    deadLine: new FormControl(''),
    max: new FormControl(),
    registered: new FormControl(),
    sched: new FormControl()
  });

  ngOnInit() {
   this.date = new Date();
    console.log(this.date);
    this.user = this.servAuth.loadCurrentUser();
    this.serv.getSchedules().subscribe((res) => {
      this.schedule = res;
     // this.schedule = this.schedule.filter((c) => c.deadLine > this.date);
      this.searchSched = this.schedule.filter((c: { deadLine: string | number | Date; currentEnrollment: number; maxCapacity: number; }) => (c.deadLine && new Date(c.deadLine) > this.date ) && c.currentEnrollment < c.maxCapacity);
      this.schedule = null;
      this.schedule = this.searchSched;

    });
    if (this.user.role == 'Admin') {
      this.displayedColumns = this.displayedColumn1;
     
    }

    else {
      this.displayedColumns = this.displayedColumn2;
 
    }
  //this.displayedColumns=this.displayedColumn1;
    
  }

  delete(code: string) {
    if (confirm("Are you sure to delete this Schedule ?")) {
      this.serv.deleteSchedule(code).subscribe(res => {
        if (res == 'Success') {
          alert("Successfully deleted");
          this.ngOnInit();
        }
        else {
          alert("ERROR!!")
        }

      })

    }
  }

  onEdit(schedule: any) {
    this.schedule.forEach((e: { isEdit: boolean; }) => {
      e.isEdit = false;
    });
    schedule.isEdit = true;
  }

  save(schedules: any) {
    if (confirm("Are you sure to make changes ?")) {
      this.frm.value.code = schedules.courseId;
      this.frm.value.name = schedules.instructor;
      this.frm.value.stime = schedules.startTIme;
      this.frm.value.etime = schedules.endTIme;
      this.frm.value.deadLine = schedules.deadLine;
      this.frm.value.max = schedules.maxCapacity;
      this.frm.value.registered = schedules.currentEnrollment;
      this.frm.value.day = schedules.year;
      this.frm.value.sched = schedules.scheduleId;
      this.serv.updateSchedule([
        this.frm.value.name,
        this.frm.value.code,
        this.frm.value.stime,
        this.frm.value.etime,
        this.frm.value.deadLine,
        this.frm.value.max,
        this.frm.value.registered,
        this.frm.value.day,
        this.frm.value.sched,
      ]).subscribe(res => {
        if (res == 'Success') {
          alert("Successfully Updated !");
          schedules.isEdit = false;
        }
        else {
          alert("Error!!");
          schedules.isEdit = false;

        }
      });
    }
  }
  cancel(courses: any) {
    courses.isEdit = false;
  }

  onSearch(value: string) {
    value = value.toLowerCase();
    this.searchSched = null;
    if (value.length > 0) {
      this.searchSched = this.schedule.filter((c: { instructor: string; courseId: string; }) =>
        c.instructor.toLowerCase().includes(value) ||
        c.courseId.toLowerCase().includes(value)
      );


    }
    else {
      this.ngOnInit();
    }
  }


  register(schedid: any) {
      if (confirm("Are you sure, Do you want to Procced ?")) {
        this.serv.registerSched(this.user.id, schedid.scheduleId).subscribe(() => {
          this.openSnackBar('Registration successful', 'success-snackbar');
          this.ngOnInit();
        },
          (error) => {
            if (error.error.message == "Registration failed: An error occurred while saving the entity changes. See the inner exception for details.") {
              this.openSnackBar('You have Already Registered to this Course', 'error-snackbar');

            }
            else {
              this.openSnackBar('Already Registered', 'error-snackbar');

            }
          }

        );
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

}
