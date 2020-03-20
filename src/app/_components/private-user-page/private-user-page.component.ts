import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CourseService} from '../../_services/course.service';
import {Router} from '@angular/router';
import {UserService} from '../../_services/user.service';

declare var $: any;


@Component({
    selector: 'app-private-user-page',
    templateUrl: './private-user-page.component.html',
    styleUrls: ['./private-user-page.component.scss']
})
export class PrivateUserPageComponent implements OnInit {

    public checkType = UserSelectedMenu;

    selectedMenu: UserSelectedMenu = UserSelectedMenu.Subscriptions;
    courseCreationForm: FormGroup;
    myCourses: Array<any>;
    userInfosForm: FormGroup;
    streamInfo: any;
    subscriptions: any;
    userImageForm: FormGroup;
    userPicture: any;
    passwordForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private courseService: CourseService,
        private router: Router,
        private userService: UserService
    ) {
    }

    onSubmitImage() {
        // console.log(this.imageForm);

        this.userService.sendUserPicture(this.userImageForm.get('file').value)
            .subscribe(value => {
                alert('Image envoyée');
                console.log(value);
                this.loadPersonalInfos();
            });
    }

    uploadFile($event: Event) {
        const file = ($event.target as HTMLInputElement).files[0];
        this.userImageForm.patchValue({
            file: file
        });
    }

    passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('newPassword1').value !== c.get('newPassword2').value) {
            return {invalid: true};
        }
    }


    ngOnInit() {
        this.loadSubscriptions();
        this.userImageForm = this.fb.group(
            {
                file: [null, [
                    Validators.required
                ]]
            }
        );

        this.passwordForm = this.fb.group(
            {
                oldPassword: ['', [
                    Validators.required
                ]],
                newPassword: this.fb.group({
                    newPassword1: ['', [
                        Validators.required,
                        Validators.minLength(8)
                    ]],
                    newPassword2: ['', [
                        Validators.required,
                        Validators.minLength(8)
                    ]]
                }, {
                    validator: this.passwordConfirming
                })
            }
        );

        this.userInfosForm = this.fb.group({
            email: [''],
            firstName: [''],
            lastName: [''],
            bio: [''],
            websiteUrl: [''],
            linkedInUrl: [''],
            twitterUrl: ['']
        });


        this.courseCreationForm = this.fb.group(
            {
                courseTitle: ['', [
                    Validators.required,
                ]]
            }
        );

    }

    get courseTitle() {
        return this.courseCreationForm.get('courseTitle');
    }

    changeView(selectedMenu: UserSelectedMenu) {

        this.selectedMenu = selectedMenu;

        switch (selectedMenu) {
            case UserSelectedMenu.Courses:
                this.loadMyCourses();
                break;
            case UserSelectedMenu.PersonalInfos:
                this.loadPersonalInfos();
                break;
            case UserSelectedMenu.Subscriptions:
                this.loadSubscriptions();
                break;
            case UserSelectedMenu.Stream:
                this.loadStreamInfosInfos();
                break;
        }

    }

    showCourseCreationModal() {
        $('#courseCreationModal').modal();
    }

    submit() {
        const course: { title: string } = {title: this.courseTitle.value};

        this.courseService.createCourse(course).subscribe(value => {
            console.log(value);
            $('#courseCreationModal').modal('hide');
            this.showEdit(value.body.id);

        });
    }

    private loadMyCourses() {
        this.courseService.loadMyCourses().subscribe(value => {
            console.log(value.body.courses);
            this.myCourses = value.body.courses;
        });
    }

    showEdit(id: number) {
        this.router.navigate(['user/course/edit', id]);
    }

    private loadPersonalInfos() {
        this.userService.getCurrentUserInfos()
            .subscribe(value => {
                console.log(value);
                const user = value.body;
                this.userPicture = user.pictureUrl;
                this.userInfosForm.get('email').setValue(user.email);
                this.userInfosForm.get('firstName').setValue(user.firstName);
                this.userInfosForm.get('lastName').setValue(user.lastName);

                this.userInfosForm.get('bio').setValue(user.bio);
                // social
                this.userInfosForm.get('websiteUrl').setValue(user.websiteUrl);
                this.userInfosForm.get('linkedInUrl').setValue(user.linkedInUrl);
                this.userInfosForm.get('twitterUrl').setValue(user.twitterUrl);
            });
    }

    onSubmitUserForm() {
        const user = {
            email: this.userInfosForm.get('email').value,
            firstName: this.userInfosForm.get('firstName').value,
            lastName: this.userInfosForm.get('lastName').value,
            bio: this.userInfosForm.get('bio').value,
            // social
            websiteUrl: this.userInfosForm.get('websiteUrl').value,
            linkedInUrl: this.userInfosForm.get('linkedInUrl').value,
            twitterUrl: this.userInfosForm.get('twitterUrl').value
        };
        this.userService.updateCurrentUserInfos(user).subscribe(
            value => {
                alert('Sauvegardé');
            }
        );
    }

    private loadStreamInfosInfos() {
        this.userService.getStreamInfos()
            .subscribe(value => {
                console.log(value);
                this.streamInfo = {...value.body};
            });
    }

    goLive(id: number) {
        this.courseService.goLive(id)
            .subscribe(value => {
                console.log(value);
                alert('Live commencé');
                this.loadMyCourses();
            });
    }

    stopLive(id: number) {
        this.courseService.endLive(id)
            .subscribe(value => {
                console.log(value);
                alert('Live terminé');
                this.loadMyCourses();
            });
    }

    showLive(courseId: number) {
        this.router.navigate(['live', courseId]);
    }

    private loadSubscriptions() {
        this.courseService.getSubscribedCourses()
            .subscribe(value => {
                console.log(value);
                this.subscriptions = value.body.courses;
            });
    }

    onSubmitPasswordForm() {
        const oldPassword = this.passwordForm.get('oldPassword').value;
        const newPassword = this.passwordForm.get(['newPassword', 'newPassword1']).value;
        this.userService.changePassword(oldPassword, newPassword)
            .subscribe(
                value => {
                    console.log(value);
                    const message = value.body.message;
                    this.passwordForm.reset();
                    switch (message) {
                        case 'PASSWORD_UPDATED':

                            alert('Mot de passe mis à jour');
                            break;
                        case 'INVALID_PASSWORD':
                            alert('Ancien mot de passe invalide !');
                            break;
                    }
                }
            );
    }

    onChange() {
        console.log(this.passwordForm);
    }
}

enum UserSelectedMenu {
    PersonalInfos,
    Subscriptions,
    Courses,
    Stream
}
