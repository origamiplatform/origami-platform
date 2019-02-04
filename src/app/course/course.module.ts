import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from './components/components.module';

import { CourseComponent } from './containers/course/course.component';
import { CourseDetailComponent } from './containers/course-detail/course-detail.component';
import { CourseListComponent } from './containers/course-list/course-list.component';

import { CourseRoutingModule } from './course-routing.module';

export const CONTAINERS = [
  CourseComponent,
  CourseListComponent,
  CourseDetailComponent
];

@NgModule({
  imports: [
    CourseRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
})
export class CourseModule { }
