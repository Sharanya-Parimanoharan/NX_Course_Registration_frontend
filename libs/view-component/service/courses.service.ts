import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:7118/api/';

  authToken = localStorage.getItem("access_token");

  addCourse(course: Array<string>) {
    return this.http.post(this.baseUrl + "Courses/send", {
      name: course[0],
      code: course[1],
      preRequirements: course[2],
      department: course[3]

    }, {
      responseType: 'text',
    });
    
  }

  getCourses() {
    return this.http.get(this.baseUrl + "Courses/get", {
     
    });
     
  }

  deleteCourse(code: string) {
    return this.http.delete(this.baseUrl + `Courses/delete/${code}`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
      }, 
      responseType: 'text',
    });
  }

  update(course: Array<string>) {
    console.log(course);
    return this.http.put(this.baseUrl + `Courses/${course[1]}`, {
      name: course[0],
      code: course[1],
      preRequirements: course[2],
      department: course[3],
    }, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json', // You may need to adjust this based on your server's expectations
      }, 
      
      responseType: 'text'
    });
  }


  addSchedules(schedules: Array<string>, time: Array<any>) { 
    console.log(time); 
    return this.http.post(this.baseUrl + "Schedules/send", {
      instructor: schedules[0],
      CourseId: schedules[1],
      timeSlots: time,
      maxCapacity: schedules[2],
      deadLine: schedules[3],
      currentEnrollment: 0,
      CourseSchedules: [],
      StudentSchedule: [],
      ScheduleSlots:[]
    }, {
 
      responseType: 'text',
    });

  }

  getSchedules() {
    let head_obj = new HttpHeaders().set("Authorization", "bearer " + this.authToken);
    return this.http.get(this.baseUrl + "Schedules/get", {
    });

  }

  updateSchedule(schedule: Array<string>) {
    return this.http.put(this.baseUrl + `Schedules/${schedule[8]}`, {
      instructor: schedule[0],
      courseId: schedule[1],
      startTIme: schedule[2],
      endTIme: schedule[3],
      deadLine: schedule[4],
      maxCapacity: schedule[5],
      currentEnrollment: schedule[6],
      year: schedule[7],
      scheduleId: schedule[8],
      CourseSchedules: []
    }, {
    
      responseType: 'text'
    });
  }

  deleteSchedule(code: any) {
    return this.http.delete(this.baseUrl + `Schedules/delete/${code}`,
      {
       
      responseType: 'text',
    });
  }

  registerSched(id: any, schedid: string) {
    return this.http.post(this.baseUrl + `Student/register-schedule/${id}/${schedid}`,
      {
      
      responseType: 'text',
    });
  }
  Registered(id:string) {
    return this.http.get(this.baseUrl + `StudentSchedule/get/${id}`);
     
  }
  unEnroll(code: string,id:any) {
    return this.http.delete(this.baseUrl + `StudentSchedule/delete/${code}/${id}`, {
    
      responseType:'text',
    }
      );
  }

  RegisteredStudents() {
    return this.http.get(this.baseUrl + 'StudentSchedule', {
    
    });
  }
}
