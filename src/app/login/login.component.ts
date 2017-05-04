import { Component, OnInit } from "@angular/core";
import { User } from "./user/user";
import { Router } from "@angular/router";
import { XSRFStrategy, CookieXSRFStrategy } from "@angular/http";
import { Util } from "../core/util/util";
import { OAuthService } from "../core/oauth/oauth.service";
import { UserService } from "./user/user.service";
import { TokenService } from "../core/token/token.service";
import { LoginService } from "./login.service";


@Component({
    selector: 'login',
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    providers: [UserService,
        {provide: XSRFStrategy, useFactory: Util.xsrfFactory}
        ]
})

export class LoginComponent implements OnInit {

    user: User = new User('prasad', 'test1234');
    unknownUser: User = new User();
    validLogin: boolean = true;

    validUser: boolean = true;
    welcome = 'Login Page';
    welcomeNote = this.welcome;
    greeting: string;
    loginResponse = '';
    classMap: any;
    time: number;
    sessionValid: boolean;


    constructor(private router: Router, private oauthService: OAuthService
        , private userService: UserService, private tokenService: TokenService,
                private loginService: LoginService) {
        // User might already have valid token
        this.reRouteIfNeeded();

        this.classMap = {'alert': false, 'alert-success': false, 'alert-danger': false};

    }

    authenticate() {
        this.loginService.authenticate(this.unknownUser).subscribe(data => {
            this.loginService.saveResponse(data);
            let oauthRes: string = JSON.stringify(data);
            //  console.log("Current_User:" + this.oauthService.getCurrentUser());
            this.fetchUserProfile();
            this.userService.createNewSession();
            this.routeToHome();
            this.isValidLogin(true);
        }, errorCode => {
            switch (errorCode / 100) {
                case 4:
                    this.invalidCredentials();
                    break;
                case 5:
                    this.internalServerError();
                    break;
                default:
                    this.unknownError();

            }
            this.isValidLogin(false);
        });

    }

    errorHandling(errorCode) {
        switch (errorCode / 100) {
            case 4:
                this.invalidCredentials();
                break;
            case 5:
                this.internalServerError();
                break;
            default:
                this.unknownError();

        }
        this.isValidLogin(false);
    }

    invalidCredentials() {
        this.classMap = {'alert': true, 'alert-success': false, 'alert-danger': true};
        this.loginResponse = 'Oops, Your credentials did not macth!!';
        this.validUser = false;
        return;
    }

    internalServerError() {
        this.classMap = {'alert': true, 'alert-success': false, 'alert-danger': true};
        this.loginResponse = 'Oops, Authentication server error occured!!';
        this.validUser = false;
        return;
    }

    unknownError() {
        this.classMap = {'alert': true, 'alert-success': false, 'alert-danger': true};
        this.loginResponse = 'Oops, Authentication Server seems to be down!!';
        this.validUser = false;
        return;
    }

    ngOnInit() {
        // if (this.authenticationGuard.canActivate()) {
        //   this.authenticationGuard.routeHome();
        // }
    }


    routeToHome() {
        this.router.navigate(['/home']);
    }

    isValidLogin(state: boolean) {
        this.validLogin = state;
    }

    fetchUserProfile() {
        this.loginService.fetchUserProfile().subscribe(data => {
            let profileName = data['firstName'];
            this.loginService.saveProfileName(profileName);
        }, this.errorHandling)
    }

    /**
     * Checks if user has a valid token. If yes then re-routes to home.
     */
    reRouteIfNeeded() {
        if (this.tokenService.hasValidToken()) {
            this.router.navigate(['/home'])
        }
    }

}
