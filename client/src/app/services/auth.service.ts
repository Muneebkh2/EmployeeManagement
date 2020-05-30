import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  localhost = 'http://localhost:3000/api/'

  login(body) {
    return this.http.post(this.localhost + 'login', body)
  }

}


