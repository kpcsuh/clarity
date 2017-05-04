import { NgModule } from "@angular/core";
import { ClarityModule } from 'clarity-angular';
import { ExamineeAssessmentNewComponent } from "./examinee-assessment-new/examinee-assessment-new.component";
import { SharedModule } from "../shared/shared.module";
import { ExamineeAssessmentService } from "./examinee-assessment.service";
import { ExamineeAssessmentRoutingModule } from "./examinee-assessment-routing.module";
import { ExamineeAssessmentComponent } from "./examinee-assessment.component";

@NgModule({
    imports: [ExamineeAssessmentRoutingModule, SharedModule, ClarityModule.forRoot()],
    declarations: [ExamineeAssessmentNewComponent, ExamineeAssessmentComponent],
    providers: [ExamineeAssessmentService]
})

export class ExamineeAssessmentModule {

}
