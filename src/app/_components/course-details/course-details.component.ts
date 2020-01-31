import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {Router, RouterStateSnapshot} from '@angular/router';
import {state} from '@angular/animations';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
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
