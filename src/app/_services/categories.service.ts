import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ApiEnpoints} from '../_class/apiEnpoints';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private apiService: ApiService) {
    }

    public getAllCategories() {
        return this.apiService.makeGetRequest(ApiEnpoints.GET_CATEGORIES);
    }


}
