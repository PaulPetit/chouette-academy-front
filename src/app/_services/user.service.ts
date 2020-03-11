import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ApiEnpoints} from "../_class/apiEnpoints";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private apiService: ApiService) {
    }

    getCurrentUserInfos() {
        return this.apiService.makeGetRequest(ApiEnpoints.GET_CURRENT_USER_INFOS);
    }

    updateCurrentUserInfos(userInfos: any) {
        return this.apiService.makePutRequest(ApiEnpoints.UPDATE_CURRENT_USER_INFOS, null, userInfos);
    }
}
