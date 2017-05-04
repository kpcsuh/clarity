import { Injectable } from "@angular/core";
import { Http, Response, RequestOptionsArgs, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { TokenService } from "../../core/token/token.service";

@Injectable()
export class HttpService {

    public headers: any = {};
    protected baseUrl: string = '';

    constructor(protected http: Http, protected tokenService: TokenService) {
    }

    setTokenAuthorizationHeader() {
        if (this.tokenService.hasValidToken()) {
            this.setDefaultContentType();
            this.setHeader('Authorization', 'Bearer ' + this.getAccessToken())
        }
    }

    setDefaultContentType() {
        this.setHeader('Content-Type', 'application/json');
    }

    setHeader(key: string, value: string) {
        this.headers[key] = value;
    }

    setBaseUrl(url: string) {
        this.baseUrl = url;
    }

    removeHeader(key: string) {
        delete this.headers[key];
    }


    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
    }

    post(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
        let localData = this.prepareData(data);
        return this.http.post(this.generateUrl(url), localData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
    }

    put(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
    }

    patch(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
        ;
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.delete(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.handleError);
    }

    protected responseHandler(response: Response): Response {

        if (response.status == 204) {
            return null;
        }
        if (Math.floor(response.status / 100) != 2) {
            this.handleError(response);
        }

        if (!!response.text()) {
            return response.json();
        }
        return response;
    }


    private handleError(error: Response | any) {
        let errMsg: string;
        let errorCode: number = 500;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errorCode = error.status;
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        return Observable.throw(errorCode);
    }

    protected generateUrl(url: string): string {
        return !!url.match(/^((?:http(|s):\/\/www\.)|(?:http:\/\/))/) ? url : this.baseUrl + url;
    }

    protected generateOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
        if (!options.headers) {
            options.headers = new Headers();
        }
        this.setTokenAuthorizationHeader();

        Object.keys(this.headers)
            .filter((key) => this.headers.hasOwnProperty(key))
            .forEach((key) => {
                options.headers.append(key, this.headers[key]);
            });

        return options;
    }

    private getAccessToken() {
        return this.tokenService.getAccessToken();
    }

    private prepareData(data: Object): any {
        let localData = null;
        if (data instanceof URLSearchParams) {
            localData = data;
        } else {
            localData = JSON.stringify(data)
        }
        return localData;
    }
}
