import { NgModule } from "@angular/core";
import { ClarityModule } from 'clarity-angular';
import { SharedModule } from "../shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { OAuthService } from "../core/oauth/oauth.service";
import { LoginService } from "./login.service";


@NgModule({
    imports: [SharedModule, LoginRoutingModule, ClarityModule.forRoot()],
    declarations: [LoginComponent],
    providers: [OAuthService,
        LoginService
    ]
})

export class LoginModule {
}
