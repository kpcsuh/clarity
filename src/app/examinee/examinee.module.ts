import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ExamineeRoutingModule } from "./examinee-routing.module";
import { ExamineeComponent } from "./examinee.component";
import { ExamineeService } from "./examinee.service";
import { ExamineeNewComponent } from "./examinee-new/examinee-new.component";
import { ExamineeDetailsComponent } from "./examinee-details/examinee-details.component";
import { ClarityModule } from 'clarity-angular';
import { ExamineeListComponent } from './examinee-list/examinee-list.component';


@NgModule({
    imports: [SharedModule, ExamineeRoutingModule, ClarityModule.forRoot()],
    declarations: [ExamineeComponent, ExamineeNewComponent, ExamineeDetailsComponent, ExamineeListComponent],
    providers: [ExamineeService],
    exports: [ExamineeComponent]
})

export class ExamineeModule {
}
