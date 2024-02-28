import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormControl,FormGroup, Validators, FormArray ,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatIconModule } from '@angular/material/icon';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {CoursesService} from '../../../../../view-component/service/courses.service';
@Component({
  selector: 'mono-repo-popups-add-schedule',
  standalone: true,
  imports: [HttpClientModule,MatButtonModule,MatInputModule,MatDialogModule,MatSelectModule,MatFormFieldModule,MatIconModule,MatDatepickerModule,NgxMatTimepickerModule,CommonModule,FormsModule,ReactiveFormsModule,DatePipe],
  templateUrl: './popups-add-schedule.component.html',
  styleUrl: './popups-add-schedule.component.css',
  providers:[CoursesService]
})
export class PopupsAddScheduleComponent implements OnInit {
  constructor(private serv: CoursesService, private dialog: MatDialog) { }
  formattedTime: any;
  courses: any;

  newDayTimeSlot = {
    day: '' ,
    startTIme: '' ,
    endTIme: '',
  };
  Schedules = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    dayTimeSlots: new FormArray([] , Validators.required),
    capacity: new FormControl('', Validators.required),
    deadLine: new FormControl('', Validators.required),
  });


   dayTimeSlotGroup = new FormGroup({
    day: new FormControl('', Validators.required),
    sTime: new FormControl('', Validators.required),
    eTime: new FormControl('', Validators.required),
  });

  get dayTimeSlots(): FormArray {
    return this.Schedules.get('dayTimeSlots') as FormArray;
  }
  addDayTimeSlot() {
    this.newDayTimeSlot = {
      day:(this.dayTimeSlotGroup.value.day),
       startTIme:(this.dayTimeSlotGroup.value.sTime + ":00"),
       endTIme:(this.dayTimeSlotGroup.value.eTime + ":00"),
    };
    //console.log(this.newDayTimeSlot);
    
    this.Schedules.value.dayTimeSlots.push(this.newDayTimeSlot);
    this.Schedules.value.dayTimeSlots.sTime = this.Schedules.value.dayTimeSlots.sTime + ":00";
    this.Schedules.value.dayTimeSlots.eTime = this.Schedules.value.dayTimeSlots.eTime + ":00";
   // console.log(this.Schedules);
    this.dayTimeSlotGroup.reset();
  }

  ngOnInit() {
    this.serv.getCourses().subscribe((res) => {
      this.courses = res;
      //console.log(this.courses);

    });

  }


  get name() {
    return this.Schedules.get('name') as FormControl;
  }
  get code() {
    return this.Schedules.get('code') as FormControl;
  }
  
  get capacity() {
    return this.Schedules.get('capacity') as FormControl;
  }
  get deadLine() {
    return this.Schedules.get('deadLine') as FormControl;
  }



  addSchedules() {
   
    this.Schedules.value.deadLine = this.Schedules.value.deadLine + ":00";

    console.log(this.Schedules.value.dayTimeSlots);

      this.serv.addSchedules([
      this.Schedules.value.name||'',
      this.Schedules.value.code||'',
      this.Schedules.value.capacity||'',
      this.Schedules.value.deadLine,
        

      ], this.Schedules.value.dayTimeSlots||[]
).subscribe(res => {
      if (res == "Success") {
        alert("Successfully added !");
        this.dialog.closeAll();
        if (window.location.href == "http://localhost:4200/signin/schedules") {
          window.location.reload();
        }
      }
      else {
        alert("Error!!");
        this.dialog.closeAll();
        if (window.location.href == "http://localhost:4200/signin/schedules") {
          window.location.reload();
        }

      }
      
    });

  }
}
