import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { TokenService } from "./core/token/token.service";
import { AppService } from "./app.service";


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private title: string = "ProjectOne";
    private profileName: string;
    private hidden: boolean = true;


    constructor(private tokenService: TokenService, private appService: AppService, private router: Router) {
        this.hidden = this.tokenService.hasValidToken();
        this.tokenService.tokenValidityEmitter.subscribe(event => {
            this.hidden = event;
        });
    }


    getProfileName() {
        return this.tokenService.getProfileName();
    }

    hide() {
        return !this.hidden;
    }

    logout() {
        this.appService.logout();
    }
}
