import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpResponseBase} from '@angular/common/http';
import {log} from 'util';
import {TokenService} from './token.service';
import {finalize} from 'rxjs/operators';
import {PendingRequestClass} from '../_class/pending-request.class';
import {ApiHttpMethod} from '../_enum/api-http-method.enum';
import {Router} from '@angular/router';
import {MessagesService} from './messages.service';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private requests$ = new Subject<any>();
    private queue: PendingRequestClass[] = [];

    constructor(private httpClient: HttpClient, private tokenService: TokenService, private router: Router,
                private messageService: MessagesService) {
        this.requests$.subscribe(request => this.execute(request));
    }

    /** Call this method to add your http request to queue */
    private invoke(url: string, method: ApiHttpMethod, paramsGet, body, options): Subject<any> {
        return this.addRequestToQueue(url, method, paramsGet, body, options);
    }

    private execute(requestData: PendingRequestClass) {

        // Si on demmande une page où l'authentification est necessaire,
        // On vérifie si on est authentifié
        // si pas authentifié, on redirige vers la page de login avec un message
        // Ne pas oublier de vider la liste des requettes en attente

        const token = this.getToken();

        /* if (token === null) {
           if (requestData.url.includes('private')) {
             // pas de droit
             // on redirige
             this.messageService.addErrorMessage('Erreur', 'Vous devez être connecté pour continuer');
             this.router.navigate(['login']);
             return;
           }
         }*/

        if (requestData.url.includes('logout')) {
            this.tokenService.removeToken();
        }

        let headersToSet = new HttpHeaders();

        if (token !== null) {
            headersToSet = headersToSet.set('Authorization', 'Bearer ' + token);
        }

        let httpOptions: { headers: HttpHeaders; observe: string, params?: HttpParams } = {
            headers: headersToSet,
            observe: 'response',
            params: requestData.paramsGet
        };

        httpOptions = {...httpOptions, ...requestData.options};

        switch (requestData.method) {
            case ApiHttpMethod.GET:
                this.getMethod(requestData, httpOptions);
                break;
            case ApiHttpMethod.POST:
                this.postMethod(requestData, httpOptions);
                break;
            case ApiHttpMethod.PUT:
                this.putMethod(requestData, httpOptions);
                break;
            default:
                console.error('Method Not Implemented !');
                break;
        }
    }

    private postMethod(requestData: PendingRequestClass, httpOptions: { headers: HttpHeaders; observe: string, params?: HttpParams }) {
        const sub = requestData.subscription;
        // @ts-ignore
        this.httpClient.post(requestData.url, requestData.body, httpOptions)
            .pipe(finalize(() => {
                this.queue.shift();
                this.startNextRequest();
            }))
            .subscribe(res => {
                    sub.next(res);
                    this.updateToken(res);
                },
                error => {
                    sub.error(error);
                    // log(error);
                });
    }

    private putMethod(requestData: PendingRequestClass, httpOptions: { headers: HttpHeaders; observe: string, params?: HttpParams }) {
        const sub = requestData.subscription;
        // @ts-ignore
        this.httpClient.put(requestData.url, requestData.body, httpOptions)
            .pipe(finalize(() => {
                this.queue.shift();
                this.startNextRequest();
            }))
            .subscribe(res => {
                    sub.next(res);
                    this.updateToken(res);
                },
                error => {
                    sub.error(error);
                    // log(error);
                });
    }

    private getMethod(requestData: PendingRequestClass, httpOptions: { headers: HttpHeaders; observe: string, params?: HttpParams }) {
        const sub = requestData.subscription;
        // @ts-ignore
        this.httpClient.get(requestData.url, httpOptions)
            .pipe(finalize(() => {
                this.queue.shift();
                this.startNextRequest();
            }))
            .subscribe(res => {
                    sub.next(res);
                    this.updateToken(res);
                },
                error => {
                    sub.error(error);
                    // log(error);
                });
    }

    private addRequestToQueue(url, method, paramsGet, body, options): Subject<any> {
        const sub = new Subject<any>();
        const request = new PendingRequestClass(url, method, paramsGet, body, options, sub);

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

        const token = res.headers.get('X-token');
        if (token !== null) {
            this.tokenService.setToken(token);
        }
    }

    private getToken() {
        log('lecture du token');
        return this.tokenService.getToken();
    }

    public makeGetRequest(url: string, paramsGet: object = null, options: {
        headers?: HttpHeaders;
        observe?: string;
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: string;
        withCredentials?: boolean;
    } = null): Subject<any> {
        return this.invoke(url, ApiHttpMethod.GET, paramsGet, null, options);
    }

    public makePostRequest(url: string, paramsGet: object, body: object, options: {
        headers?: HttpHeaders;
        observe?: string;
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: string;
        withCredentials?: boolean;
    } = null): Subject<any> {
        return this.invoke(url, ApiHttpMethod.POST, paramsGet, body, options);
    }

    public makePutRequest(url: string, paramsGet: object, body: object, options: {
        headers?: HttpHeaders;
        observe?: string;
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: string;
        withCredentials?: boolean;
    } = null): Subject<any> {
        return this.invoke(url, ApiHttpMethod.PUT, paramsGet, body, options);
    }

    public makeDeleteRequest(url: string, paramsGet: object, options: {
        headers?: HttpHeaders;
        observe?: string;
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: string;
        withCredentials?: boolean;
    } = null): Subject<any> {
        return this.invoke(url, ApiHttpMethod.DELETE, paramsGet, null, options);
    }
}
