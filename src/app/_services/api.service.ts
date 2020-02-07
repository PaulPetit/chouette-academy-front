import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponseBase} from '@angular/common/http';
import {log} from 'util';
import {TokenService} from './token.service';
import {finalize} from 'rxjs/operators';
import {PendingRequestClass} from '../_class/pending-request.class';
import {ApiHttpMethod} from '../_enum/api-http-method.enum';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private requests$ = new Subject<any>();
  private queue: PendingRequestClass[] = [];

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
    this.requests$.subscribe(request => this.execute(request));
  }

  /** Call this method to add your http request to queue */
  public invoke(url: string, method: ApiHttpMethod, params, options) {
    return this.addRequestToQueue(url, method, params, options);
  }


  private execute(requestData: PendingRequestClass) {

    const token = this.getToken();


    if (requestData.url.includes('logout')) {
      this.tokenService.removeToken();
    }

    const headersToSet = new HttpHeaders();

    if (token !== null) {
      headersToSet.append('Authorization', 'Bearer ' + token);
    }

    const httpOptions = {
      headers: headersToSet,
      observe: 'response'
    };


    switch (requestData.method) {
      case ApiHttpMethod.GET:
        this.getMethod(requestData, httpOptions);
        break;
      case ApiHttpMethod.POST:
        this.postMethod(requestData, httpOptions);
        break;
      default:
        console.error('Method Not Implemented !');
        break;
    }
  }

  private postMethod(requestData: PendingRequestClass, httpOptions: { headers: HttpHeaders; observe: string }) {
    // @ts-ignore
    this.httpClient.post(requestData.url, requestData.params, httpOptions)
      .pipe(finalize(() => {
        this.queue.shift();
        this.startNextRequest();
      }))
      .subscribe(res => {
          const sub = requestData.subscription;
          sub.next(res.body);
          this.updateToken(res);
        },
        error => {
          log(error);
        });
  }

  private getMethod(requestData: PendingRequestClass, httpOptions: { headers: HttpHeaders; observe: string }) {
    // @ts-ignore
    this.httpClient.get(requestData.url, httpOptions)
      .pipe(finalize(() => {
        this.queue.shift();
        this.startNextRequest();
      }))
      .subscribe(res => {
          const sub = requestData.subscription;
          sub.next(res);
          this.updateToken(res);
        },
        error => {
          log(error);
        });
  }

  private addRequestToQueue(url, method, params, options) {
    const sub = new Subject<any>();
    const request = new PendingRequestClass(url, method, params, options, sub);

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

  private updateToken(res: HttpResponseBase) {
    log('écriture du nouveau token');
    const token = res.headers.get('X-token');
    if (token !== null) {
      this.tokenService.setToken(token);
    }

  }

  private getToken() {
    log('lecture du token');
    return this.tokenService.getToken();
  }
}
