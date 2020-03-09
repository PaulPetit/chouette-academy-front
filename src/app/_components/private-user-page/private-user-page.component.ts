import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../_services/course.service";
import {Router} from "@angular/router";

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

    constructor(private fb: FormBuilder, private courseService: CourseService, private router: Router) {
    }

    ngOnInit() {

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
        }


    }

    showCourseCreationModal() {

        $('#courseCreationModal').modal();

    }

    submit() {
        const course: {title: string} = {title: this.courseTitle.value};

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
}

enum UserSelectedMenu {
    Subscriptions,
    Courses,
    Stream
}
