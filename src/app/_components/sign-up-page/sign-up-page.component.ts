import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserRegisterModel} from '../../_models/userRegisterModel';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesService} from '../../_services/messages.service';
import {ApiMessages} from '../../_models/ApiMessages.enum';
import {HttpResponse} from '@angular/common/http';
import {UserService} from '../../_services/user.service';

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

    public submitted = false;

    public signUpForm: FormGroup;
    public emailAlreadyUsed = false;
    public userNameAlreadyUsed = false;

    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                private router: Router,
                private messagesService: MessagesService,
                private autenticationService: AuthenticationService,
                private userService: UserService,
                private messageService: MessagesService,
                private route: ActivatedRoute
    ) {
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
        const userRegisterModel: UserRegisterModel = {
            email: this.login.value,
            userName: this.username.value,
            password: this.password.value
        };

        this.authenticationService.register(userRegisterModel)
            .subscribe(
                response => {
                    // console.log(response);
                    // @ts-ignore
                    const apiMessages: ApiMessages = ApiMessages[response.body.message];

                    if (apiMessages === ApiMessages.REGISTERED_OK) {
                        /*this.messagesService.addSuccessMessage('Register', 'Vous pouvez désormais vous connecter');
                        this.router.navigate(['login']);*/

                        this.autenticationService.login(this.login.value, this.password.value)
                            .subscribe((value: HttpResponse<any>) => {
                                    // console.log(value);
                                    const userID = value.body.data.userId;

                                    localStorage.setItem('userId', userID);

                                    this.userService.getCurrentUserInfos()
                                        .subscribe(value1 => {

                                            // console.log(value1);
                                            this.autenticationService.setUserName(value1.body.fullName);


                                            this.messageService.addSuccessMessage('Connexion', 'Connexion réussie');
                                            this.route.queryParams.subscribe(params => {
                                                const redirect = params.redirectUrl || '/';
                                                this.router.navigate([redirect]);
                                            });
                                        });


                                },
                                (error: any) => {

                                });


                    } else {
                        // Dans le cas d'une erreur
                        if (apiMessages === ApiMessages.EMAIL_ALREADY_EXISTS) {
                            this.submitted = false;
                            this.emailAlreadyUsed = true;
                        }
                        if (apiMessages === ApiMessages.USER_NAME_ALREADY_EXISTS) {
                            this.submitted = false;
                            this.userNameAlreadyUsed = true;
                        }

                    }


                },
                error => {
                    console.log(error);
                }
            );
    }

    resetErrors() {
        this.emailAlreadyUsed = false;
        this.userNameAlreadyUsed = false;
    }
}
