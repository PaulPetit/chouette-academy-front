import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ApiEndpoints} from '../_class/apiEndpoints';
import {HttpParams} from '@angular/common/http';
import {ApiChatMessage} from '../_class/apiChatMessage.class';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private apiService: ApiService) {
    }

    sendMessage(message: ApiChatMessage) {
        // this.apiService.invoke()
        return this.apiService.makePostRequest(ApiEndpoints.CHAT_POST, null, message);
    }


    getMessages(chatId: any, startTime: number, endTime: number) {

        const params: HttpParams = new HttpParams()
            .set('startDate', startTime.toString())
            .set('endDate', endTime.toString());

        let url: string = ApiEndpoints.CHAT_GET;
        url = url.replace('{chatID}', chatId.toString());

        return this.apiService.makeGetRequest(url, params);
    }

    getServerTime(): Observable<any> {
        return this.apiService.makeGetRequest(ApiEndpoints.CHAT_GET_SERVER_TIME, null, null);
    }
}
