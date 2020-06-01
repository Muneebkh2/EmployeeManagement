import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenManagerService } from './token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private _authService: TokenManagerService, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    if (this._authService.isLoggedIn()) {
      if (this._authService.retrieveUserInfo() == expectedRole[0] || this._authService.retrieveUserInfo() == expectedRole[1] || this._authService.retrieveUserInfo() == expectedRole[2] || this._authService.retrieveUserInfo() == expectedRole) {
        return true;
      } else {
        return false;
      }
    }

    this._router.navigate(['/login']);
    return false;
  }
}
