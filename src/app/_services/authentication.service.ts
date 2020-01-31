import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
  }


  isAuthenticated(): boolean {
    // console.log("isAuthenticated " + localStorage.getItem("logged"));
    // console.log(localStorage.getItem("logged") === "true");

    return localStorage.getItem('logged') === 'true';
  }

  login(email: string, password: string): Observable<boolean> {

    // faux login
    // console.error(email, password);


    if (email === 'paul.petit76@gmail.com' && password === 'adminadmin') {
      localStorage.setItem('logged', 'true');
      return of(true).pipe(delay(1000)); // délai de 1s pour simuler l'appel à l'api
    } else {
      localStorage.setItem('logged', 'false');
      return of(false).pipe(delay(1000)); // délai de 1s pour simuler l'appel à l'api;
    }

  }

  logout() {
    localStorage.removeItem('logged');
  }

}
