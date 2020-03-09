import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ApiEnpoints} from "../_class/apiEnpoints";

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private apiService: ApiService) {
    }

    createCourse(course: { title: string }) {
        return this.apiService.makePostRequest(ApiEnpoints.CREATE_COURSES, null, course);
    }

    loadMyCourses() {
        return this.apiService.makeGetRequest(ApiEnpoints.GET_MY_COURSES);
    }

    getCourse(courseId: number) {
        return this.apiService.makeGetRequest(ApiEnpoints.GET_COURSE + "/" + courseId);
    }
}
