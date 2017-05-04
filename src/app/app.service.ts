import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AppService {
  constructor(private loginService: LoginService) {
  }

  logout() {
      this.loginService.logout();
  }

}
