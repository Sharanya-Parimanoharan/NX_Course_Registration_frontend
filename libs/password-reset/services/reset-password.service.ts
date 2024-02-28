import { Injectable } from '@angular/core';
import { HttpClient
 } from '@angular/common/http';

 import { ResetPassword } from './reserPassword';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  baseUrl = 'https://localhost:7118/api/Student';
  constructor(private http: HttpClient) { }

  sendResetpasswordLink(email: string) {
    return this.http.post(`${this.baseUrl}/send-reset-email/${email}`, {
      responseType: 'json',
    });
  }

  resetPassword(resetPass: ResetPassword) {
    return this.http.post(`${this.baseUrl}/reset-email`, resetPass, {
      responseType:'text',
    });
  }

  send(email: string) {
    return this.http.post(`${this.baseUrl}/unenrolled/${email}`, {
    });
  }
}
