import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CourseManagerComponent } from './course-manager/course-manager.component';
import { CategoryManagerComponent } from './category-manager/category-manager.component';



/* Dialogs */
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { LectureDialogComponent } from './lecture-dialog/lecture-dialog.component';

const COMPONENTS = [
  CourseManagerComponent,
  CategoryManagerComponent,

  CategoryDialogComponent,
  CourseDialogComponent,
  LectureDialogComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    CourseDialogComponent,
    CategoryDialogComponent,
    LectureDialogComponent
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
