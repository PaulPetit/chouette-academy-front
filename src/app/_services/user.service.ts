import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ApiEndpoints} from "../_class/apiEndpoints";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private apiService: ApiService) {
    }

    getCurrentUserInfos() {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_CURRENT_USER_INFOS);
    }

    updateCurrentUserInfos(userInfos: any) {
        return this.apiService.makePutRequest(ApiEndpoints.UPDATE_CURRENT_USER_INFOS, null, userInfos);
    }

    getUserInfosById(id: number) {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_USER_PUBLIC_INFOS_BY_ID + '/' + id);
    }

    getStreamInfos() {
        return this.apiService.makeGetRequest(ApiEndpoints.GET_USER_STREAM_URL);
    }
}
