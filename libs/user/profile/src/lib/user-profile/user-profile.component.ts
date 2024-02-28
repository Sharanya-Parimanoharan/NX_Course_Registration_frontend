import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthserviceService} from '../../../../services/authservice.service';
import { DatePipe, Location } from '@angular/common';
import { FormControl, FormGroup,Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {  MatIconModule } from '@angular/material/icon';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NavMenuSideNavMenuComponent} from '@mono-repo/nav-menu/side-nav-menu';
import { RouterModule } from '@angular/router';
import {NavMenuTopMenuComponent} from '@mono-repo/nav-menu/top-menu';

@Component({
  selector: 'mono-repo-user-profile',
  standalone: true,
  imports: [RouterModule,NavMenuTopMenuComponent,NavMenuSideNavMenuComponent,MatButtonModule,HttpClientModule,CommonModule,FormsModule,MatFormFieldModule,MatStepperModule,ReactiveFormsModule,MatIconModule,MatInputModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  providers:[AuthserviceService,DatePipe]
})
export class UserProfileComponent implements OnInit {
  obj:any;
  sideNavStatus: boolean = false;
  hide = true;
  repeatPass = "none";
  originalDate: any;
  formatted: any;

  constructor(private serv: AuthserviceService, private datePipe: DatePipe, private location: Location,private http:HttpClient) { }

  firstFormGroup = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    lastname: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl("", Validators.required),
    nic: new FormControl("", Validators.required),
    mobile: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$')]),
    member: new FormControl("", Validators.required),


  });


  secondFormGroup = new FormGroup({
    pwd: new FormControl(""),
    rpwd:new FormControl("")
  });
  isLinear = false;

  get pwd() {
    return this.secondFormGroup.get("pwd");
  }
  get rpwd() {
    return this.secondFormGroup.get("rpwd");
  }
  get mobile() {
    return this.firstFormGroup.get("mobile");
  }
  get firstname() {
    return this.firstFormGroup.get("firstname");
  }
  get lastname() {
    return this.firstFormGroup.get("lastname");
  }

  ngOnInit() {
    this.obj = this.serv.loadCurrentUser();
    console.log(this.obj.role);

    this.firstFormGroup.value.firstname = this.obj.firstname ;
    this.firstFormGroup.value.lastname = this.obj.lastname;
    this.firstFormGroup.value.email = this.obj.email;
    this.firstFormGroup.value.mobile =this. obj.mobile;
    this.firstFormGroup.value.nic = this.obj.id;
    this.firstFormGroup.value.member = this.obj.member;
  }

  sendUpdate() {
    this.originalDate = new Date(this.obj.member);
    this.formatted = this.datePipe.transform(this.originalDate, 'yyyy-MM-ddTHH:mm:ss.SSSSSSS');
    this.serv.updateStudent([
      this.firstFormGroup.value.firstname,
      this.firstFormGroup.value.lastname,
      this.firstFormGroup.value.email,
      this.firstFormGroup.value.nic,
      this.firstFormGroup.value.mobile,
      this.formatted,
      this.secondFormGroup.value.pwd,
      this.obj.role,
    ]).subscribe(res => {
      if (res == 'Failure') {
        
        alert("Error")

      }
      else {
        this.serv.removeToken();
        this.serv.setToken(res);
        alert("Updated Successfully!!");
      }
      this.close();
    });
  }

  cancel() {
    this.ngOnInit();
  }

  RepeatPassCheck() {
    if (this.pwd?.value == this.rpwd?.value) {
      this.repeatPass = 'none';
      this.sendUpdate();
    }
    else {
      this.repeatPass = 'inLine';
    }
  }

  close() {
    this.location.back();
  }
}
