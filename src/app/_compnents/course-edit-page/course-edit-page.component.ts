import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../_services/course.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../_services/categories.service";

@Component({
    selector: 'app-course-edit-page',
    templateUrl: './course-edit-page.component.html',
    styleUrls: ['./course-edit-page.component.scss']
})
export class CourseEditPageComponent implements OnInit {

    courseId: number;
    public courseForm: FormGroup;
    public categories: any;

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private categoriesService: CategoriesService,
        private fb: FormBuilder) {
    }

    ngOnInit() {
        this.courseId = +this.route.snapshot.paramMap.get('course-id');

        this.courseForm = this.fb.group({
            title: ['', [
                Validators.required
            ]],
            description: ['', [
                Validators.required
            ]],
            category: [null, [
                Validators.required
            ]],
            date: ['', [
                Validators.required
            ]]

        });

        this.loadCategories();
        this.loadData();
    }

    get title() {
        return this.courseForm.get('title');
    }

    get description() {
        return this.courseForm.get('description');
    }

    get category() {
        return this.courseForm.get('category');
    }

    private loadData() {

        this.categoriesService.getAllCategories()
            .subscribe(value => {
                this.categories = value.body.categories;
                console.log(value);
                this.courseService.getCourse(this.courseId)
                    .subscribe(value => {
                        console.log(value);
                        const course = value.body;

                        this.title.setValue(course.title);
                        this.description.setValue(course.description);
                        this.category.setValue(course.categoryId);
                        //this.courseForm.controls.title.setValue('abc');
                        console.log(this.courseForm.get('title'));
                        //this.changeDetectorRef.detectChanges()
                    });
            })


    }

    onSubmit() {
        console.log(this.courseForm.get('category'));
    }

    private loadCategories() {

    }
}
