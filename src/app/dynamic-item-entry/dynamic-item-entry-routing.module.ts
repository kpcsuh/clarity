
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DynamicItemEntryComponent } from "./dynamic-item-entry.component";
import { AuthenticationGuard } from "../core/auth-guard/auth.guard";


const routes: Routes = [
    {
        path: '',
        component: DynamicItemEntryComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class DynamicItemEntryRouting {

}