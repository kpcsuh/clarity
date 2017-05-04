import {NgModule} from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { DynamicItemEntryComponent } from "./dynamic-item-entry.component";
import { DynamicItemEntryService } from "./dynamic-item-entry.service";
import { DynamicItemEntryRouting } from "./dynamic-item-entry-routing.module";
import { DynamicItemEntryTemplateService } from "./dynamic-item-entry-template.service";


@NgModule({
    imports : [SharedModule, DynamicItemEntryRouting],
    declarations: [DynamicItemEntryComponent],
    exports: [DynamicItemEntryComponent]

})

export class DynamicItemEntryModule {
    // This should be singleton.
    static forRoot() {
        return {
            ngModule:DynamicItemEntryModule,
            providers: [DynamicItemEntryService, DynamicItemEntryTemplateService]
        }

    }

}