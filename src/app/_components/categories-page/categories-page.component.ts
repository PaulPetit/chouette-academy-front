import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories-page.component.html',
    styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {

    private categoryId: number;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(val => {
            this.categoryId = Number(this.route.snapshot.paramMap.get('category-id'));
            console.log( this.categoryId);
        });
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        alert('Destroy !');
    }

}
