import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {CoursesService} from '../../../../../view-component/service/courses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'mono-repo-popups-add-course',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatInputModule,CommonModule,ReactiveFormsModule,MatFormFieldModule,HttpClientModule,MatSelectModule],
  templateUrl: './popups-add-course.component.html',
  styleUrl: './popups-add-course.component.css',
  providers:[CoursesService]
})
export class PopupsAddCourseComponent {
  constructor(private serv: CoursesService, private dialog: MatDialog) { }

  courses = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    pre: new FormControl(''),
    dept: new FormControl('', Validators.required)
  });

  get name() {
    return this.courses.get('name') as FormControl;
  }
  get code() {
    return this.courses.get('code') as FormControl;
  }
  get pre() {
    return this.courses.get('pre') as FormControl;
  }
  get dept() {
    return this.courses.get('dept') as FormControl;
  }

  addCourses() {
    this.serv.addCourse([
      this.courses.value.name ||'',
      this.courses.value.code ||"".toUpperCase(),
      this.courses.value.pre||'',
      this.courses.value.dept||""

    ]).subscribe(res => {
      if (res == "AlreadyExist") {
        alert("This course already exist !");
        this.dialog.closeAll();
        if (window.location.href == "http://localhost:4200/signin/courses") {
          window.location.reload();
        }

      }
      else {
        alert("Successfully added !");
        this.dialog.closeAll();
        if (window.location.href == "http://localhost:4200/signin/courses") {
          window.location.reload();
        }
      }
    });

  }
}
