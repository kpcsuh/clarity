import { Injectable } from "@angular/core";
import { RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserService } from "./user/user.service";
import { User } from "./user/user";
import { OAuthService } from "../core/oauth/oauth.service";
import { OAuthResponse } from "../core/oauth/oauth-response";
import { AuthenticationGuard } from "../core/auth-guard/auth.guard";
import { HttpService } from "../shared/http/http.service";
import { environment } from "../../environments/environment";
import { TokenService } from "../core/token/token.service";

@Injectable()
export class LoginService {

    private users: Array<User>;
    validUser: boolean = true;
    welcome = 'Login Page';
    welcomeNote = this.welcome;
    greeting: string;
    loginResponse = '';
    existingUser: User = new User('', '');
    classMap: any;
    time: number;
    sessionValid: boolean;


    constructor(private http: HttpService,
                private oauthService: OAuthService,
                private authenticationGuard: AuthenticationGuard,
                private userService: UserService,
                private tokenService: TokenService,
                private router: Router) {
        this.classMap = {'alert': false, 'alert-success': false, 'alert-danger': false};
    }

    authenticate(user: User): Observable<any> {
        return this.oauthService.oauthLogin(user.getUserName(), user.getPassword());
    }

    private invalidCredentials() {
        this.classMap = {'alert': true, 'alert-success': false, 'alert-danger': true};
        this.loginResponse = 'Oops, Your credentials did not macth!!'
        this.validUser = false;
        return false;
    }

    private internalServerError() {
        this.classMap = {'alert': true, 'alert-success': false, 'alert-danger': true};
        this.loginResponse = 'Oops, Authentication server error occured!!'
        this.validUser = false;
        return false;
    }

    private unknownError() {
        this.classMap = {'alert': true, 'alert-success': false, 'alert-danger': true};
        this.loginResponse = 'Oops, Authentication Server seems to be down!!'
        this.validUser = false;
        return false;
    }

    ngOnInit() {
        //no content
    }

    saveResponse(data: OAuthResponse) {
        this.tokenService.saveTokenData(data);
    }

    fetchUserProfile(): Observable<any> {
        return this.http.get(this.prepareProfileUrl());
    }

    prepareProfileUrl(): string {
        return environment.oauthServerBaseUrl + "/auth/me";
    }

    saveProfileName(name: string) {
        this.tokenService.setProfileName(name);
    }

    logout() {
        this.router.navigate(['/login']);
        this.http.post(this.prepareLogoutUrl(), new RequestOptions({headers: null}));
        this.tokenService.clearTokenData();

    }


    prepareLogoutUrl() {
        return environment.oauthServerBaseUrl + "/auth/api/logout";
    }
}
