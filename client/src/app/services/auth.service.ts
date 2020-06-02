import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  localhost = 'http://localhost:3000/api/'


  // *****************
  //  Employee CRUD -> Request Methods
  // *****************

  // forget Request to email
  forgotPasswordEmail(body) {
    return this.http.post(this.localhost + 'forgotPassword/email', body)
  }
  // forget Request to reset password
  forgotPassword(body) {
    return this.http.post(this.localhost + 'forgotPassword', body)
  }

  // login 
  login(body) {
    return this.http.post(this.localhost + 'login', body)
  }

}


