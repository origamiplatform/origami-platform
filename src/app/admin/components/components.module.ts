import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CourseManagerComponent } from './course-manager/course-manager.component';

const COMPONENTS = [
  CourseManagerComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    CourseManagerComponent
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
