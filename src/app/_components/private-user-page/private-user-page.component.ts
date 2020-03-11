import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../_services/course.service";
import {Router} from "@angular/router";
import {UserService} from "../../_services/user.service";

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

    constructor(
        private fb: FormBuilder,
        private courseService: CourseService,
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {

        this.userInfosForm = this.fb.group({
            email: [''],
            firstName: [''],
            lastName: [''],
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
        }


    }

    showCourseCreationModal() {
        $('#courseCreationModal').modal();
    }

    submit() {
        const course: { title: string } = {title: this.courseTitle.value};

        this.courseService.createCourse(course).subscribe(value => {
            console.log(value);
        });
    }

    private loadMyCourses() {
        this.courseService.loadMyCourses().subscribe(value => {
            console.log(value.body.courses);
            this.myCourses = value.body.courses;
        });
    }

    showEdit(id: number) {
        this.router.navigate(["user/course/edit", id]);
    }

    private loadPersonalInfos() {
        this.userService.getCurrentUserInfos()
            .subscribe(value => {
                //console.log(value);
                const user = value.body;
                this.userInfosForm.get('email').setValue(user.email);
                this.userInfosForm.get('firstName').setValue(user.firstName);
                this.userInfosForm.get('lastName').setValue(user.lastName);
            });
    }

    onSubmitUserForm() {
        const user = {
            email: this.userInfosForm.get('email').value,
            firstName: this.userInfosForm.get('firstName').value,
            lastName: this.userInfosForm.get('lastName').value,
        };
        this.userService.updateCurrentUserInfos(user).subscribe();
    }
}

enum UserSelectedMenu {
    PersonalInfos,
    Subscriptions,
    Courses,
    Stream
}
