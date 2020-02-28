import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {ApiEnpoints} from '../_class/apiEnpoints';
import {ApiHttpMethod} from '../_enum/api-http-method.enum';
import {UserRegisterModel} from '../_models/userRegisterModel';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private apiService: ApiService) {
    }


    isAuthenticated(): boolean {
        // console.log("isAuthenticated " + localStorage.getItem("logged"));
        // console.log(localStorage.getItem("logged") === "true");

        return localStorage.getItem('token') !== null;
    }


    login(email: string, password: string): Observable<any> {
        /*
        // faux login
        // console.error(email, password);


        if (email === 'paul.petit76@gmail.com' && password === 'adminadmin') {
          localStorage.setItem('logged', 'true');
          return of(true).pipe(delay(1000)); // délai de 1s pour simuler l'appel à l'api
        } else {
          localStorage.setItem('logged', 'false');
          return of(false).pipe(delay(1000)); // délai de 1s pour simuler l'appel à l'api;
        }

         */
        // return this.apiService.invoke(ApiEnpoints.LOGIN, ApiHttpMethod.POST, null, {login: email, password: password}, null);
        return this.apiService.makePostRequest(ApiEnpoints.LOGIN, null, {login: email, password: password});

    }

    logout() {
        return this.apiService.makePostRequest(ApiEnpoints.LOGOUT, null, null);
    }


    register(userRegisterModel: UserRegisterModel) {
        return this.apiService.makePostRequest(ApiEnpoints.REGISTER, null, userRegisterModel);
    }
}
