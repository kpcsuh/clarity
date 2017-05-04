import { Optional, Injectable } from "@angular/core";
import { User } from "./user";

export class UserServiceConfig {
    userName = 'Guest';
}

@Injectable()
export class UserService {

    private user: User;

    constructor(@Optional() config: UserServiceConfig) {
        this.user = new User();
        if (config) {
            this.user.setUserName(config.userName);
        }
    }

    createNewSession() {
        //this.navEmitter.sessionValid.emit(true);
    }
}
