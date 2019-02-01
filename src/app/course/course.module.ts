import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from './components/components.module';

import { CourseComponent } from './containers/course/course.component';
import { ExploreComponent } from './containers/explore/explore.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailComponent } from './containers/course-detail/course-detail.component';

export const CONTAINERS = [
  CourseComponent,
  ExploreComponent,
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
