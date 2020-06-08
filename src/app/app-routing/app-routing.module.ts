import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'; //import the "RouterModule"
import {routes} from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes) //pass "routes" as the parameter to the "RouterModule"
  ],
  exports:[
    RouterModule //now export the RouterModule with "routes" as the new paratmeter
  ],
  declarations: []
})
export class AppRoutingModule { 

}
