import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CourseManagerComponent } from './course-manager/course-manager.component';
import { CategoryManagerComponent } from './category-manager/category-manager.component';



/* Dialogs */
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { AddCourseDialogComponent } from './add-course-dialog/add-course-dialog.component';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';


const COMPONENTS = [
  CourseManagerComponent,
  CategoryManagerComponent,

  CategoryDialogComponent,
  AddCourseDialogComponent,
  EditCourseDialogComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    CategoryDialogComponent,
    AddCourseDialogComponent,
    EditCourseDialogComponent
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
