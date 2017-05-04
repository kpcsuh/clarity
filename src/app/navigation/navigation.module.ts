import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavigationComponent } from "./navigation.component";
import { NavigationService } from "./navigation.service";
import { FooterComponent } from "./footer/footer.component";


@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [NavigationComponent, FooterComponent],
    providers: [NavigationService],
    exports: [NavigationComponent, FooterComponent],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class NavigationModule {

}
