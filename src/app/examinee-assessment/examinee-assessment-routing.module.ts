import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExamineeAssessmentNewComponent } from "./examinee-assessment-new/examinee-assessment-new.component";
import { ExamineeAssessmentComponent } from "./examinee-assessment.component";
import { AuthenticationGuard } from "../core/auth-guard/auth.guard";

const routes: Routes = [{
    path: "examinee-assessment-new",
    component: ExamineeAssessmentNewComponent,
    canActivate: [AuthenticationGuard]
},
{
    path: "examinee-assessment-new/:examineeId",
    component: ExamineeAssessmentNewComponent,
    canActivate: [AuthenticationGuard]
},
    {
        path: "examinee-assessment",
        component: ExamineeAssessmentComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: "examinee-assessment/:examineeId",
        component: ExamineeAssessmentComponent,
        canActivate: [AuthenticationGuard]
    }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExamineeAssessmentRoutingModule {

}
