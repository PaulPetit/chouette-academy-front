import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ApiEndpoints} from '../_class/apiEndpoints';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private apiService: ApiService) {
    }

    public getAllCategories() {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_CATEGORIES);
    }


}
