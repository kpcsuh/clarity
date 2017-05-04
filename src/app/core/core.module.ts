import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService, UserServiceConfig } from "../login/user/user.service";
import { OAuthService } from "./oauth/oauth.service";
import { LoggingService } from "./logger/logging.service";
import { CoreLocalStorageService } from "./storage/core-local-storage.service";
import { CoreSessionStorageService } from "./storage/core-session-storage.service";
import { AuthenticationGuard } from "./auth-guard/auth.guard";
import { NavigationEmitter } from "./navigation.emitter";
import { TokenService } from "./token/token.service";

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [UserService,
        LoggingService,
        OAuthService,
        CoreLocalStorageService,
        CoreSessionStorageService,
        AuthenticationGuard,
        NavigationEmitter,
        TokenService
    ]
})

/**
 * CoreModule contains single-use classes. Multi-uses classess
 * should go in SharedModule.
 */

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error("CoreModule is already loaded. Import it AppModule only.");
        }
    }

    static forRoot(config: UserServiceConfig): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {provide: UserServiceConfig, useValue: config}
            ]
        };
    }
}
