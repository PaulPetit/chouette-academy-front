import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {CourseService} from '../../_services/course.service';

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories-page.component.html',
    styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {

    private categoryId: number;
    data: any;

    constructor(private route: ActivatedRoute, private courseService: CourseService) {
        this.route.params.subscribe(val => {
            this.categoryId = +this.route.snapshot.paramMap.get('category-id');
            this.loadData();
        });
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
    }

    private loadData() {
        this.courseService.getAllCoursesByCategory(this.categoryId)
            .subscribe(value => {
                console.log(value);
                this.data = value.body;
            });
    }
}
