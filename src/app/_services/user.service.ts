import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ApiEndpoints} from '../_class/apiEndpoints';

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

    sendUserPicture(picture: any) {
        const formData = new FormData();
        formData.append('file', picture);
        return this.apiService.makePostRequest(ApiEndpoints.SEND_USER_PICTURE, null, formData);
    }

    changePassword(oldPassword: any, newPassword: any) {
        const data = {
            password: oldPassword,
            newPassword: newPassword
        };
        return this.apiService.makePostRequest(ApiEndpoints.CHANGE_PASSWORD, null, data);
    }
}
