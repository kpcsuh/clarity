import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExamineeComponent } from "./examinee.component";
import { ExamineeNewComponent } from "./examinee-new/examinee-new.component";
import { AuthenticationGuard } from "../core/auth-guard/auth.guard";

const routes: Routes = [
    {
        path: 'examinee',
        component: ExamineeComponent,
        canActivate: [AuthenticationGuard]
    },

    {
        path: 'examinee/new',
        component: ExamineeNewComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'examinee/edit/:id',
        component: ExamineeNewComponent,
        canActivate: [AuthenticationGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExamineeRoutingModule {
}
