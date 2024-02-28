import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { FormControl,FormGroup ,Validators ,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthserviceService} from '../../../../services/authservice.service';
import {ResetPasswordService} from '../../../../../password-reset/services/reset-password.service';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule ,MatFormField} from "@angular/material/form-field";
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import {FooterComponent} from './../../../../../footer/src/lib/footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import {NavMenuNavMenuComponent} from '@mono-repo/nav-menu/nav-menu';
@Component({
  selector: 'mono-repo-user-signin',
  standalone: true,
  imports: [CommonModule,FormsModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,HttpClientModule,FooterComponent,MatFormField,MatIcon,NavMenuNavMenuComponent],
  templateUrl: './user-signin.component.html',
  styleUrl: './user-signin.component.css',
  providers:[AuthserviceService,ResetPasswordService]
})
export class UserSigninComponent {

  
  isUserValid: boolean = false;
  ress: any;
  resetPassword: string='' ;
  isValid: boolean=true;
  hide: boolean = true;
  pass: string='';
  
  constructor(private authService: AuthserviceService, private router: Router, private resetserv: ResetPasswordService) { }
  
  loginfrm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required])
  });

  get email() {
    return this.loginfrm.get("email");
  }

  get pwd() {
    return this.loginfrm.get("pwd");
  }



  loginSubmit() {

    this.authService.loginStudent([
      this.loginfrm.value.email ||'',
      this.loginfrm.value.pwd ||''
    ]).subscribe(res => {
      if (res == "Failure") {
        this.isUserValid = false;
        alert("Login unsuccessful");

      }
      else {
        this.isUserValid = true;
        this.authService.setToken(res);
        this.ress = this.authService.loadCurrentUser();
        this.router.navigateByUrl('/signin/courses');

      }
    });

  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValid = pattern.test(value);
    return this.isValid

  }

 

  confirm() {
    this.resetserv.sendResetpasswordLink(this.resetPassword)
      .subscribe((res) => {
        alert('Email sent!');
          this.resetPassword = "";
          const btn = document.getElementById("closebtn");
          btn && btn.dispatchEvent(new Event('click'));
        },
        (error) => {
          console.log(error.error.message);
          alert(error.error.message);
        }

      );
  }
}
