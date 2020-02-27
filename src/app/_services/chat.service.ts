import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ApiEnpoints} from '../_class/apiEnpoints';
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
        return this.apiService.makePostRequest(ApiEnpoints.CHAT_POST, null, message);
    }


    getMessages(chatId: any, startTime: number, endTime: number) {

        const params: HttpParams = new HttpParams()
            .set('startDate', startTime.toString())
            .set('endDate', endTime.toString());

        let url: string = ApiEnpoints.CHAT_GET;
        url = url.replace('{chatID}', chatId.toString());

        return this.apiService.makeGetRequest(url, params);
    }

    getServerTime(): Observable<any> {
        return this.apiService.makeGetRequest(ApiEnpoints.CHAT_GET_SERVER_TIME, null, null);
    }
}
