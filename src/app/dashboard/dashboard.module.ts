import {NgModule} from '@angular/core';
import {ExamineeModule} from '../examinee/examinee.module';
import {DashboardComponent} from './dashboard.component';
import { ClarityModule } from 'clarity-angular';


@NgModule({
  declarations: [DashboardComponent],
  imports: [ExamineeModule, ClarityModule.forRoot()],
})
export class DashBoardModule {

}
