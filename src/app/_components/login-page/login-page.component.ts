import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public submitted: boolean = false;

  public loginForm: FormGroup;
  

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      login: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(8)
      ]]
    });

    

  }



  get login(){
    return this.loginForm.get('login');
  }

  get password(){
    return this.loginForm.get('password');
  }




  onSubmit() {
    this.submitted = true;
  }
}
