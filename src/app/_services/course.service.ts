import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ApiEnpoints} from "../_class/apiEnpoints";
import {filter, flatMap, map} from "rxjs/operators";
import {EMPTY} from "rxjs";

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

    updateCourse(course) {
        return this.apiService.makePutRequest(ApiEnpoints.UPDATE_COURSE, null, course);
    }

    sendImage(imaage: any, courseId: number) {
        const formData = new FormData();
        formData.append('file', imaage);
        return this.apiService.makePostRequest(ApiEnpoints.SEND_COURSE_PICTURE + '/' + courseId, null, formData);
    }

    getAllCourses() {
        return this.apiService.makeGetRequest(ApiEnpoints.GET_COURSES);
    }

    getUpcommingCourses() {
        return this.apiService.makeGetRequest(ApiEnpoints.GET_UPCOMING_COURSES)
    }
}
