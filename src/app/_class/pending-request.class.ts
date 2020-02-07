import {Subject} from 'rxjs';
import {ApiHttpMethod} from '../_enum/api-http-method.enum';

export class PendingRequestClass {
    url: string;
    method: ApiHttpMethod;
    options: any;
    params: any;
    subscription: Subject<any>;

    constructor(url: string, method: ApiHttpMethod, params: any, options: any, subscription: Subject<any>) {
        this.url = url;
        this.method = method;
        this.params = params;
        this.options = options;
        this.subscription = subscription;
    }
}
