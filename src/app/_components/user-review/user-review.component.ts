import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';

@Component({
    selector: 'app-user-review',
    templateUrl: './user-review.component.html',
    styleUrls: ['./user-review.component.scss']
})
export class UserReviewComponent implements OnInit {

    review: { name: string, picture: string };

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.getUser();
    }

    private getUser() {
        this.http.get('https://randomuser.me/api/?nat=fr')
            .pipe(
                map((value: any) => {
                    return {
                        name: value.results[0].name.first + ' ' + value.results[0].name.last,
                        picture: value.results[0].picture.large
                    };
                })
            )
            .subscribe(value => {
                this.review = value;
            });
    }

}
