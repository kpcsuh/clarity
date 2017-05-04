import { Injectable } from "@angular/core";
import { LoginService } from "../login/login.service";

@Injectable()
export class NavigationService {
    constructor(private loginService: LoginService) {
    }

    logout() {
        this.loginService.logout();
    }
}
