import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { CoreModule } from "./core/core.module";
import {ExamineeModule} from './examinee/examinee.module';
import {LoginModule} from './login/login.module';
import {NavigationModule} from './navigation/navigation.module';
import {AppService} from './app.service';
import {ROUTING} from './app-routing.module';
import { ListComponent } from './list/list.component';
import {ListModule} from './list/list.module';
import {ExamineeAssessmentModule} from './examinee-assessment/examinee-assessment.module';
import { DashBoardModule} from './dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        CoreModule.forRoot({userName: 'Guest'}),
        ROUTING,
        ExamineeModule,
        LoginModule,
        NavigationModule,
        ListModule,
        ExamineeAssessmentModule,
        DashBoardModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
