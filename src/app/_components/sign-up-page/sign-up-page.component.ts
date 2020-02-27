import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

    public submitted = false;

    public signUpForm: FormGroup;

    constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {


        this.signUpForm = this.fb.group({
            login: ['', [
                Validators.required,
                Validators.email,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
            ]],
            username: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
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
            }, {validator: this.passwordConfirming}),

        });


    }

    passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('confirm_password').value) {
            return {invalid: true};
        }
    }

    get login() {
        return this.signUpForm.get('login');
    }

    get username() {
        return this.signUpForm.get('username');
    }

    get password() {
        return this.signUpForm.get(['passwords', 'password']);
    }


    get passwordConfirm() {
        return this.signUpForm.get(['passwords', 'confirm_password']);
    }

    onSubmit() {
        this.submitted = true;
        this.authenticationService.register(this.login.value, this.username.value, this.password.value)
            .subscribe(
                response => {
                    console.log(response);
                },
                error => {
                    console.log(error);
                }
            );
    }

}
