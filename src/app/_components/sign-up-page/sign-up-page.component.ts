import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  public submitted: boolean = false;

  public signUpForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {


    this.signUpForm = this.fb.group({
      login: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      
      passwords: this.fb.group({
        password: ['', [
          Validators.required,
          Validators.minLength(8)
        ]],
        confirm_password: ['', [
          Validators.required,
          Validators.minLength(8)
        ]],
      }, { validator: this.passwordConfirming }),

    });

    
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
      return { invalid: true };
    }
  }
  get login() {
    return this.signUpForm.get('login');
  }

  get password() {
    return this.signUpForm.get(['passwords','password']);
  }

  get passwordConfirm() {
    return this.signUpForm.get(['passwords','confirm_password']);
  }

  onSubmit() {
    this.submitted = true;
  }

}
