import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  constructor(private router: Router) { }

  private tokenKey: 'app_token';

  public store(content: Object, role: Object, email: Object, name: Object, id: Object) {
    // if{localStorage}
    if (localStorage.length == null) {
      localStorage.setItem(this.tokenKey, JSON.stringify({
        token: content,
        role: role,
        email: email,
        name: name,
        id: id,
      }));
    } else {
      localStorage.clear();
      localStorage.setItem(this.tokenKey, JSON.stringify({
        token: content,
        role: role,
        email: email,
        name: name,
        id: id,
      }));
    }
  }

  public retrieveUserRole() {
    let data = JSON.parse(localStorage.getItem(this.tokenKey));
    // let data:any = localStorage.getItem(this.tokenKey);
    if (!data) return null;
    return data.role;
  }

}
