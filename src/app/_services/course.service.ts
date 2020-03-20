import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ApiEndpoints} from '../_class/apiEndpoints';
import {filter, flatMap, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private apiService: ApiService) {
    }

    createCourse(course: { title: string }) {
        return this.apiService.makePostRequest(ApiEndpoints.CREATE_COURSES, null, course);
    }

    loadMyCourses() {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_MY_COURSES);
    }

    getCourse(courseId: number) {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_COURSE + '/' + courseId);
    }

    updateCourse(course) {
        return this.apiService.makePutRequest(ApiEndpoints.UPDATE_COURSE, null, course);
    }

    sendImage(imaage: any, courseId: number) {
        const formData = new FormData();
        formData.append('file', imaage);
        return this.apiService.makePostRequest(ApiEndpoints.SEND_COURSE_PICTURE + '/' + courseId, null, formData);
    }

    getAllCourses() {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_COURSES);
    }

    getUpcommingCourses() {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_UPCOMING_COURSES);
    }

    getAllCoursesByCategory(categoryId: number) {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_COURSES_BY_CATEGORY + '/' + categoryId);
    }

    search(query: string) {
        return this.apiService.makeGetRequest(ApiEndpoints.SEARCH, {q: query});
    }

    subscribeToCourse(courseId: number) {
        return this.apiService.makePostRequest(ApiEndpoints.SUBSCRIBE_TO_COURSE.replace('{id}', courseId.toString()), null, null);
    }

    unsubscribeToCourse(courseId: number) {
        return this.apiService.makePostRequest(ApiEndpoints.UNSUBSCRIBE_TO_COURSE.replace('{id}', courseId.toString()), null, null);
    }

    goLive(courseId: number) {
        return this.apiService.makePutRequest(ApiEndpoints.GO_LIVE + '/' + courseId, null, null);
    }

    endLive(courseId: number) {
        return this.apiService.makePutRequest(ApiEndpoints.END_LIVE + '/' + courseId, null, null);
    }

    getSubscribedCourses() {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_SUBSCRIBED_COURSES);
    }
}
