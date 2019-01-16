import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CourseManagerComponent, CourseDialog } from './course-manager/course-manager.component';
import { CategoryManagerComponent, CategoryDialog } from './category-manager/category-manager.component';

const COMPONENTS = [
  CourseManagerComponent,
  CourseDialog,
  CategoryManagerComponent,
  CategoryDialog
];

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    CategoryDialog,
    CourseDialog
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
