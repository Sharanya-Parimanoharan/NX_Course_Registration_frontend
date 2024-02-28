import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ResetPasswordService} from '../../../../services/reset-password.service';
import {ResetPassword} from '../../../../services/reserPassword';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'mono-repo-password-reset-password-reset',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,HttpClientModule],
  templateUrl: './password-reset-password-reset.component.html',
  styleUrl: './password-reset-password-reset.component.css',
  providers:[ResetPasswordService]
})
export class PasswordResetPasswordResetComponent {
  repeatPass: string = "none";
  displayMsg: string = '';
  emailToken!: string;
  emailToReset!: string;
  pass!: string;
  hide: boolean = true;

  resetPasswordObj = new ResetPassword();


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];

      this.emailToken = uriToken.replace(/ /g, '+');
    })
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private resetserv: ResetPasswordService) { }

  resetPasswd = new FormGroup({
    pwd: new FormControl('', [Validators.required]),
    rpwd: new FormControl('', [Validators.required])
  });

  get rpwd() {
    return this.resetPasswd.get("rpwd");
  }

  get pwd() {
    return this.resetPasswd.get("pwd");
  }



  reset() {
    if (this.pwd?.value == this.rpwd?.value) {
      this.repeatPass = "none";
      this.pass = bcrypt.hashSync(this.resetPasswd.value.pwd, 10);

      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.pass;
      this.resetPasswordObj.confirmPassword = this.pass;
      this.resetPasswordObj.emailToken = this.emailToken;
      console.log(this.resetPasswordObj);
      this.resetserv.resetPassword(this.resetPasswordObj).subscribe(res => {
        console.log(res);
        if (res == "Password Reset Successfully") {
          alert("Successfully Updated!!");
        }
        if (res == "Invalid Reset Link") {
          alert("Invalid Reset Link");
        }
        if (res =="User doesnt Exist") {
          alert("Something went wrong!");
        }
      }
      )
    }
    else {
      this.repeatPass = 'inline';
    }

  }

}
