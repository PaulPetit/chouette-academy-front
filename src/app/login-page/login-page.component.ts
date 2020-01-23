import { Component, OnInit } from '@angular/core';
import {UserCredentials} from '../user-cretentials'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private user : UserCredentials = {login:null, password:null};
  private submitted : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  

  onSubmit(){
    console.log(this.user);
    this.submitted = true;
  }
}
