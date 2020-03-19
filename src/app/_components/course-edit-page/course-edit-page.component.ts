import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../_services/course.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../_services/categories.service';

@Component({
    selector: 'app-course-edit-page',
    templateUrl: './course-edit-page.component.html',
    styleUrls: ['./course-edit-page.component.scss']
})
export class CourseEditPageComponent implements OnInit {

    courseId: number;
    public courseForm: FormGroup;
    public categories: any;
    options: any = {format: 'DD/MM/YYYY'};
    imageForm: FormGroup;
    coursePicture: string;

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private categoriesService: CategoriesService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {

        this.courseId = +this.route.snapshot.paramMap.get('course-id');

        this.imageForm = this.fb.group(
            {
                file: [null, [
                    Validators.required
                ]]
            }
        );

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
            ]],
            hour: ['', [
                Validators.required
            ]],
            minute: ['', [
                Validators.required
            ]]
        });

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

    get date() {
        return this.courseForm.get('date');
    }

    get hour() {
        return this.courseForm.get('hour');
    }

    get minute() {
        return this.courseForm.get('minute');
    }

    private loadData() {

        //this.initDAteDebug();

        this.categoriesService.getAllCategories()
            .subscribe(value => {
                this.categories = value.body.categories;
                console.log(value);
                this.courseService.getCourse(this.courseId)
                    .subscribe(value => {
                        console.log(value);
                        const course = value.body;

                        this.coursePicture = course.pictureUrl;

                        // remplir les dates
                        const timestampPlanned = course.timestampStreamPlanned;
                        // const timeZoneOffset = new Date().getTimezoneOffset();
                        const date = new Date(timestampPlanned * 1000);


                        const h = date.getHours();
                        const m = date.getMinutes();
                        const jour = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');

                        /*const h = date.getUTCHours() - Math.floor(timeZoneOffset / 60);
                        const m = date.getUTCMinutes() - timeZoneOffset % 60;
                        const jour = date.toISOString().substring(0,10);*/


                        this.date.setValue(jour);
                        this.hour.setValue(h);
                        this.minute.setValue(m);

                        this.title.setValue(course.title);
                        this.description.setValue(course.description);
                        this.category.setValue(course.categoryId);
                        //this.courseForm.controls.title.setValue('abc');
                        console.log(this.courseForm.get('title'));
                        //this.changeDetectorRef.detectChanges()
                    });
            });


    }

    onSubmit() {
        console.log(this.courseForm);
        const date = new Date(this.date.value);
        date.setHours(this.hour.value);
        date.setMinutes(this.minute.value);

        let timestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        timestamp = Math.floor(timestamp / 1000);

        const course = {
            id: this.courseId,
            title: this.title.value,
            description: this.description.value,
            timestampStreamPlanned: timestamp,
            categoryId: this.category.value
        };

        this.courseService.updateCourse(course)
            .subscribe(value => {
                console.log(value);
                alert('Sauvegardé');
            });

    }

    private initDAteDebug() {
        const timestampPlanned = 1585645200;
        const timeZoneOffset = new Date().getTimezoneOffset();
        const date = new Date(timestampPlanned * 1000);

        const h = date.getUTCHours() - Math.floor(timeZoneOffset / 60);
        const m = date.getUTCMinutes() - timeZoneOffset % 60;
        const jour = date.toISOString().substring(0, 10);
    }

    onSubmitImage() {
        console.log(this.imageForm);
        this.courseService.sendImage(this.imageForm.get('file').value, this.courseId)
            .subscribe(value => {
                console.log('envoi image');
                console.log(value);
            });
    }

    uploadFile($event: Event) {
        const file = ($event.target as HTMLInputElement).files[0];
        this.imageForm.patchValue({
            file: file
        });
    }
}
