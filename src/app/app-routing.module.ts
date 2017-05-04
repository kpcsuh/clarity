import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./core/auth-guard/auth.guard";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ExamineeComponent} from './examinee/examinee.component';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import {ListComponent} from './list/list.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
     {path: 'list', component: ListComponent, pathMatch: 'full'},
   {path: 'examinee', component: ExamineeComponent, pathMatch: 'full'},
  //  {path: 'examinee', loadChildren: './examinee/examinee.module#ExamineeModule', /* canActivate: [AuthenticationGuard] */},
    {path: 'item-entry', loadChildren : './dynamic-item-entry/dynamic-item-entry.module#DynamicItemEntryModule', /*canActivate: [AuthenticationGuard]*/},
    {path: 'login', loadChildren : './login/login.module#LoginModule', /*canActivate: [AuthenticationGuard]*/}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(routes);
