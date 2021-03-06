import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../_services/course.service';
import {UserService} from '../../_services/user.service';

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
    private courseId: number;
    course: any;

    constructor(
        private router: Router,
        private courseService: CourseService,
        private route: ActivatedRoute,
        public authenticationService: AuthenticationService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.courseId = +this.route.snapshot.paramMap.get('course-id');
        this.loadCourse();
    }

    connect() {
        this.router.navigate(['login'], {queryParams: {redirectUrl: this.router.routerState.snapshot.url}});
    }

    private loadCourse() {

        this.courseService.getCourse(this.courseId)
            .subscribe(value => {
                    console.log(value);
                    this.course = {...value.body};

                    this.userService.getUserInfosById(value.body.ownerId)
                        .subscribe(value1 => {
                            console.log(value1);
                            this.course = {...this.course, instructor: {...value1.body}};
                            console.log(this.course);
                        });

                },
                error => {
                    this.router.navigate(['notfound']);
                });

    }

    subscribe() {
        this.courseService.subscribeToCourse(this.courseId)
            .subscribe(value => {
                console.log(value);
                const message = value.body.message;
                switch (message) {
                    case 'SUBSCRIBED':
                        this.loadCourse();
                        break;
                }
            });
    }

    unsubscribe() {
        this.courseService.unsubscribeToCourse(this.courseId)
            .subscribe(value => {
                console.log(value);
                this.loadCourse();
            });
    }

    showLive() {
        this.router.navigate(['live', this.courseId]);
    }
}
