import { Router, CanActivate } from "@angular/router";
import { UserService } from "../../login/user/user.service";
import { Injectable } from "@angular/core";
import { NavigationEmitter } from "../navigation.emitter";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router, private tokenService: TokenService,
                private navEmitter: NavigationEmitter) {
    }

    public canActivate(): boolean {
        if (this.tokenService.hasValidToken()) {
            return true;
        } else {
          this.tokenService.clearTokenData();
          this.router.navigate(['/login']);
        }
        return false;
    }

    public routeHome() {
        this.navEmitter.showNav.emit(true);
        this.userService.createNewSession();
        this.router.navigate(['examinee']);
    }
}
