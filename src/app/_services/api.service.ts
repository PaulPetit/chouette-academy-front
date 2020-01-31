import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';


export class PendingRequest {
  url: string;
  method: ApiHttpMethod;
  options: any;
  subscription: Subject<any>;

  constructor(url: string, method: ApiHttpMethod, options: any, subscription: Subject<any>) {
    this.url = url;
    this.method = method;
    this.options = options;
    this.subscription = subscription;
  }
}

export enum ApiHttpMethod {
  GET,
  POST
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private requests$ = new Subject<any>();
  private queue: PendingRequest[] = [];

  constructor(private httpClient: HttpClient) {
    this.requests$.subscribe(request => this.execute(request));
  }

  /** Call this method to add your http request to queue */
  public invoke(url: string, method: ApiHttpMethod, params, options) {
    return this.addRequestToQueue(url, method, params, options);
  }

  private execute(requestData: PendingRequest) {
    log('lecture du token');
    // One can enhance below method to fire post/put as well. (somehow .finally is not working for me)

    switch (requestData.method) {
      case ApiHttpMethod.GET:
        break;
      case ApiHttpMethod.POST:
        break;
      default:
        console.error('Method Not Implemented !');
        break;
    }

    const req = this.httpClient.get(requestData.url)
      .subscribe(res => {
        const sub = requestData.subscription;
        sub.next(res);
        log('écriture du nouveau token');
        this.queue.shift();
        this.startNextRequest();
      });
  }

  private addRequestToQueue(url, method, params, options) {
    const sub = new Subject<any>();
    const request = new PendingRequest(url, method, options, sub);

    this.queue.push(request);
    if (this.queue.length === 1) {
      this.startNextRequest();
    }
    return sub;
  }

  private startNextRequest() {
    // get next request, if any.
    if (this.queue.length > 0) {
      this.execute(this.queue[0]);
    }
  }
}
