import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService {

    constructor(private router: Router) { }

    private tokenKey: 'app_token';

    public store(token: Object, role: Object, email: Object, name: Object, id: Object) {
        if (localStorage.length == null) {
            localStorage.setItem(this.tokenKey, JSON.stringify({
                token: token,
                role: role,
                email: email,
                name: name,
                id: id,
            }));
        } else {
            localStorage.clear();
            localStorage.setItem(this.tokenKey, JSON.stringify({
                token: token,
                role: role,
                email: email,
                name: name,
                id: id,
            }));
        }
    }

    public retrieveUserRole() {
        let data = JSON.parse(localStorage.getItem(this.tokenKey));
        if (!data) return null;
        return data.role;
    }

    public isLoggedIn() {
        let storedToken = localStorage.getItem(this.tokenKey);
        if (!storedToken) return false;
        return true;
    }

    public retrieveUserInfo() {
        let data = JSON.parse(localStorage.getItem(this.tokenKey));
        if (!data) return null;
        return data.role;
    }

    public retrieveAllInfo() {
        let data = JSON.parse(localStorage.getItem(this.tokenKey));
        if (!data) return null;
        return data;
    }


    public logout() {
        window.localStorage.clear();
        this.router.navigate(['/login']);
    }


}