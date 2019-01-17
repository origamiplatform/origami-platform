import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CourseManagerComponent, CourseDialog } from './course-manager/course-manager.component';
import { CategoryManagerComponent, CategoryDialog } from './category-manager/category-manager.component';

import { LectureManagerComponent } from './lecture-manager/lecture-manager.component';

const COMPONENTS = [
  CourseManagerComponent,
  CourseDialog,
  CategoryManagerComponent,
  CategoryDialog,
  LectureManagerComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    CategoryDialog,
    CourseDialog,
    LectureManagerComponent
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
