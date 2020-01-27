import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public submitted: boolean = false;
  public invalidCredentialsError : boolean = false;

  public loginForm: FormGroup;


  constructor(private fb: FormBuilder, private autenticationService: AuthenticationService ,private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      login: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });


  }



  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }




  onSubmit() {
    this.submitted = true;

    this.autenticationService.login(this.login.value, this.password.value).subscribe((value) =>{

      console.log("auth " + value);
      

        if(value === false){
          this.submitted = false;
          this.invalidCredentialsError = true;
          this.loginForm.reset();
        }
        else{
          console.log("redirect to /");
            this.router.navigate(['/']);
        }

    });

  }

  onFocus(){
    console.log("onFocus");
    
    if(this.invalidCredentialsError) this.invalidCredentialsError = false;
  }
}
