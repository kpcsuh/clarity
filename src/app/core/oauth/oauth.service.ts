import { Injectable } from "@angular/core";
import { Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { TokenService } from "../token/token.service";
import { HttpService } from "../../shared/http/http.service";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";
import { environment } from "../../../environments/environment";

@Injectable()
export class OAuthService {
    private clientId: string;
    private clientSecret: string;
    private scopeId: string;
    private loginUrl: string;
    private logoutUrl: string;

    private storage: TokenService;

    public setStorage(otherStorage: TokenService) {
        this.storage = otherStorage;
    }

    constructor(private http: HttpService, private coreLocalStorageService: TokenService) {
        this.setStorage(coreLocalStorageService);
        this.clientId = environment.oauthClientId;
        this.clientSecret = environment.oauthClientSecret;
        this.scopeId = environment.oauthClientScope;
        this.loginUrl = this.getOauthTokenEndpointUrl();
        this.logoutUrl = this.getOauthLogoutEndpointUrl();
    }


    /**
     *  The OAuth login method to get access token.
     **/
    oauthLogin(username: string, password: string): Observable<any> {

        this.storage.clearTokenData();
        let payload = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            username: username,
            password: password,
            scope: this.scopeId,
            grant_type: "password"
        }

        let headers: Headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + this.encodedClientIdAndSecret(),
        });

        /**
         The withCredentials should be true. As the auth server has response.setHeader("Access-Control-Allow-Origin", "*");
         in SimpleCorsFilter whixh suppose to be fixed. Until the issue is fixed withCredentials: false is used.
         **/
        let options = new RequestOptions({headers: headers, withCredentials: false});
        return this.http.post(this.loginUrl, this.serialize(payload), options);
    }

    /**
     * Serilaizes the object to URLSearchParams
     */
    private serialize(obj): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        if (!obj) {
            return params;
        }

        Object.keys(obj).forEach((key) => {
            let element = obj[key];
            params.set(key, element);
        });
        return params;
    }


    oauthTokenRenewalWithRefreshToken(): Observable<any> {

        this.storage.clearTokenData();
        let payload = {
            client_id: this.clientId,
            grant_type: "refresh_token",
            refresh_token: this.storage.getRefreshToken()
        }

        let headers: Headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + this.encodedClientIdAndSecret(),
        });

        /**
         The withCredentials should be true. As the auth server has response.setHeader("Access-Control-Allow-Origin", "*");
         in SimpleCorsFilter whixh suppose to be fixed. Until the issue is fixed withCredentials: false is used.
         **/
        let options = new RequestOptions({headers: headers, withCredentials: false});
        return this.http.post(this.loginUrl, this.serialize(payload), options);
    }

// WIP: not tested
    private getNewTokenByUsingRefreshToken(): Observable<any> {
        let payload = {
            client_id: this.clientId,
            grant_type: "refresh_token",
            refresh_token: this.storage.getRefreshToken()
        }

        let headers: Headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + this.storage.getRefreshToken(),
        });

        /**
         The withCredentials should be true. As the auth server has response.setHeader("Access-Control-Allow-Origin", "*");
         in SimpleCorsFilter whixh suppose to be fixed. Until the issue is fixed withCredentials: false is used.
         **/
        let options = new RequestOptions({headers: headers, withCredentials: false});
        return this.http.post(this.loginUrl, this.serialize(payload), options);
    }


    public updateToken() {

        this.getNewTokenByUsingRefreshToken().subscribe(data => {
            let oauthRes: string = JSON.stringify(data);

        });
    }

    getOauthTokenEndpointUrl() {
        return (environment.oauthServerBaseUrl + "/auth/oauth/token");
    }

    getOauthLogoutEndpointUrl() {
        return (environment.oauthServerBaseUrl + "/auth/api/logout");
    }


    private encodedClientIdAndSecret() {
        return btoa(this.clientId + ":" + this.clientSecret);
    }

}
