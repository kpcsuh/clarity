import { Component } from "@angular/core";
import { TokenService } from "../core/token/token.service";
import { NavigationService } from "./navigation.service";
import { Router } from '@angular/router';


@Component({
    selector: 'app-nav',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent {
    private title: string = "ProjectOne";
    private profileName: string;
    private hidden: boolean = true;


    constructor(private tokenService: TokenService, private navigationService: NavigationService, private router: Router) {
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
        this.navigationService.logout();
    }

}
