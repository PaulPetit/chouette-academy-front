import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) {
    }

    ngOnInit() {
    }

    connect() {
        this.router.navigate(['login'], {queryParams: {redirectUrl: this.router.routerState.snapshot.url}});
    }
}
