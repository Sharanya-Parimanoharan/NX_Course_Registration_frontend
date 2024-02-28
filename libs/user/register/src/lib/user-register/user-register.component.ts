import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import {AuthserviceService} from '../../../../services/authservice.service';
import { MatFormField } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import {FooterComponent} from '../../../../../footer/src/lib/footer/footer.component';
import{NavMenuNavMenuComponent} from '@mono-repo/nav-menu/nav-menu';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'mono-repo-user-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,MatFormField, MatIcon, MatIconModule ,MatButtonModule,MatDividerModule,FlexLayoutModule,MatInputModule,FooterComponent,NavMenuNavMenuComponent,RouterLink],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
  providers:[AuthserviceService],
})
export class UserRegisterComponent {
  pwdFocus = false;
  repeatPass: string = "none";
  displayMsg: string = '';
  isAccountCreated: boolean = false;
  hide = true;
  saltRounds = 10;

  pass: string='';



  constructor(private authService: AuthserviceService) { }


  registerfrm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    mobile: new FormControl('',[Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$'), Validators.required]),
    pwd: new FormControl('', [Validators.required]),
    rpwd: new FormControl('', [Validators.required]),
    studentid: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])


  });

  get firstname() {
    return this.registerfrm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.registerfrm.get('lastname') as FormControl;
  }
  get mobile() {
    return this.registerfrm.get('mobile') as FormControl;
  }
  get pwd() {
    return this.registerfrm.get('pwd') as FormControl;
  }
  get rpwd() {
    return this.registerfrm.get('rpwd') as FormControl;
  }

  get studentid() {
    return this.registerfrm.get('studentid') as FormControl;
  }
  get email() {
    return this.registerfrm.get('email') as FormControl;
  }





  registerSubmit() {
    if (this.pwd.value == this.rpwd.value) {
      this.repeatPass = "none";

     this.pass = bcrypt.hashSync(this.registerfrm.value.pwd ||'', 10);

      this.authService.registerStudent([
        this.registerfrm.value.firstname ||'',
        this.registerfrm.value.lastname ||'',
        this.registerfrm.value.email ||'',
        this.registerfrm.value.mobile||'',
       this.pass,
        this.registerfrm.value.studentid||''
      ]).subscribe(res => {
        if (res == 'Success') {
          this.displayMsg = 'Account Created Successfully';
          this.isAccountCreated = true;
        } else if (res == 'AlreadyExist') {
          this.displayMsg = 'Account Already Exist';
          this.isAccountCreated = false;
        } else {
          this.displayMsg = 'Something went wrong';
          this.isAccountCreated = false;
        }
      })
    }
    else {
      this.repeatPass = 'inline';
    }

  }
}
