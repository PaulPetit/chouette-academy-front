import {Injectable} from '@angular/core';
import {log} from "util";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {
    }

    getToken() {
        return localStorage.getItem('token');
    }

    setToken(token: string) {
        log('écriture du nouveau token');
        localStorage.setItem('token', token);
    }

    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
}
