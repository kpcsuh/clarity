import {NgModule} from '@angular/core';
import {ListComponent} from './list.component';
import { ClarityModule } from 'clarity-angular';


@NgModule({
  imports: [ClarityModule.forRoot()],
  declarations: [ListComponent]
})
export class ListModule {}
