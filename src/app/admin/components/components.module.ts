import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';


const COMPONENTS = [

];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
