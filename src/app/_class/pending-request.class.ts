import {Subject} from 'rxjs';
import {ApiHttpMethod} from '../_enum/api-http-method.enum';
import {HttpParams} from '@angular/common/http';

export class PendingRequestClass {
    url: string;
    method: ApiHttpMethod;
    options: any;
    paramsGet: HttpParams;
    subscription: Subject<any>;
    body: any;

    constructor(url: string, method: ApiHttpMethod, paramsGet: HttpParams, body: any, options: any, subscription: Subject<any>) {
        this.url = url;
        this.method = method;
        this.paramsGet = paramsGet;
        this.body = body;
        this.options = options;
        this.subscription = subscription;
    }
}
