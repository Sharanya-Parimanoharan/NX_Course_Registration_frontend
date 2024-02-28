import { Component,Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AuthserviceService} from '../../../../../user/services/authservice.service';
import {CoursesService} from '../../../../service/courses.service';
import { MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {NavMenuSideNavMenuComponent} from '@mono-repo/nav-menu/side-nav-menu';
import { RouterModule } from '@angular/router';
import {NavMenuTopMenuComponent} from '@mono-repo/nav-menu/top-menu';
@Component({
  selector: 'mono-repo-view-component-view-courses',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatTableModule,HttpClientModule,MatInputModule,NavMenuSideNavMenuComponent,RouterModule,NavMenuTopMenuComponent],
  templateUrl: './view-component-view-courses.component.html',
  styleUrl: './view-component-view-courses.component.css',
  providers:[CoursesService,AuthserviceService]
})
export class ViewComponentViewCoursesComponent  implements OnInit{

  courses: any;
  sideNavStatus: boolean = false;
  searchCourses :any;
  user: any;
  @Input() search: string = '';

  displayedColumn1: string[] = ['code', 'name', 'dept', 'pre', 'delete', 'update'];
  displayedColumn2: string[] = ['code', 'name', 'dept', 'pre'];
  displayedColumns: string[] = [];


  constructor(private serv: CoursesService, private servAuth: AuthserviceService) { }

  frm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    dept: new FormControl(''),
    pre: new FormControl('')
  });

  ngOnInit() {
    this.displayedColumns=this.displayedColumn2;
    this.user = this.servAuth.loadCurrentUser();

    this.serv.getCourses().subscribe((res) => {
      this.courses = res;
      this.searchCourses = this.courses;
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
    if (confirm("Are you sure to delete " + code)) {
      this.serv.deleteCourse(code).subscribe(res => {
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

  onEdit(courses: any) {
    this.courses.forEach((e: { isEdit: boolean; }) => {
      e.isEdit = false;
    });
    courses.isEdit = true;

  }

  save(courses: any) { 
    if (confirm("Are you sure to make changes ?")) {
      console.log(courses.code);
      this.frm.value.code = courses.code;
      this.frm.value.name = courses.name;
      this.frm.value.dept = courses.department;
      this.frm.value.pre = courses.preRequirements;

      this.serv.update([
        this.frm.value.name ||'',
        this.frm.value.code ||'',
        this.frm.value.pre||'',
        this.frm.value.dept ||''
      ]).subscribe(res => {
        if (res == 'Success') {
          alert("Successfully Updated !");
          courses.isEdit = false;
        }
        else {
          alert("Error!!");
          courses.isEdit = false;

        }
      });
    }
  }
  cancel(courses:any) {
    courses.isEdit = false;
  }

  onSearch(value: string) {
    value = value.toLowerCase();
    this.searchCourses = null;
    if (value.length > 0) {
      this.searchCourses = this.courses.filter((c:any) => 
        c.name.toLowerCase().includes(value) ||
          c.department.toLowerCase().includes(value)
      );
      
      console.log(this.searchCourses);

    }
    else {
      this.ngOnInit();
    }
  }
}
