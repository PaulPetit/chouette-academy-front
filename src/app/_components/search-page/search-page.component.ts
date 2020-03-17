import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../_services/course.service';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
    query: string;
    coursesFound: any;
    numberFound: number;

    constructor(private route: ActivatedRoute, private courseService: CourseService) {
        this.route.params.subscribe(val => {
            this.query = decodeURI(this.route.snapshot.paramMap.get('query'));
            this.loadData();
        });
    }

    ngOnInit() {
    }

    private loadData() {
        this.courseService.search(this.query)
            .subscribe(value => {
                console.log(value);
                this.coursesFound = value.body.courses;
                this.numberFound = value.body.nbCourses;
            });
    }
}
