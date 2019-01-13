import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CourseManagerComponent } from './course-manager/course-manager.component';
import { CategoryManagerComponent, CategoryDialog } from './category-manager/category-manager.component';

const COMPONENTS = [
  CourseManagerComponent,
  CategoryManagerComponent,
  CategoryDialog
];

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    CategoryDialog,
    CourseManagerComponent
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
