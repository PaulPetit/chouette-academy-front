import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'src/app/_services/messages.service';
import {CourseService} from "../../_services/course.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


    upcomingCourses: Array<any>;
    liveCourses: any;

    constructor(private messageService: MessagesService, private courseService: CourseService) {
    }

    ngOnInit() {

        this.loadUpcomingCourses();
        this.loadLives();



    }


    private loadUpcomingCourses() {
        this.courseService.getUpcommingCourses()
            .subscribe(
                value => {
                     console.log(value);
                     this.upcomingCourses = value.body.courses;
                }
            );

        /*this.courseService.getAllCourses()
            .subscribe(value => {
                let courses: Array<any> = value.body.courses;
                courses = courses.filter(value1 => value1.status == "PLANNED");
                console.log(courses);
            });*/
    }

    private loadLives() {
        this.courseService.getLiveCourses()
            .subscribe(
                value => {
                    console.log(value);
                    this.liveCourses = value.body.courses;
                }
            );
    }
}
