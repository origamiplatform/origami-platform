import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CourseListComponent } from './course-list/course-list.component';

const COMPONENTS = [
  CourseListComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    // CategoryDialog,
    // CourseDialog
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
