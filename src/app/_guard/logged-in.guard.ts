import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(public authService : AuthenticationService, private router: Router) { }

  canActivate(): boolean {

    if(this.authService.isAuthenticated()){
      this.router.navigate(["/"]);
      return false;
    }

    return true;
  }
  
}
