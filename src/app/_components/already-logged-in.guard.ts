import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) {
    }

    canActivate(): boolean {

        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }

}
