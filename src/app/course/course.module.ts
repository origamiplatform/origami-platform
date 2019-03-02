import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from './components/components.module';

import { CourseComponent } from './containers/course/course.component';
import { CourseDetailComponent } from './containers/course-detail/course-detail.component';
import { CourseExploreComponent } from './containers/course-explore/course-explore.component';
import { CourseEnrolledComponent } from './containers/course-enrolled/course-enrolled.component';

import { CourseRoutingModule } from './course-routing.module';

export const CONTAINERS = [
  CourseComponent,
  CourseExploreComponent,
  CourseDetailComponent,
  CourseEnrolledComponent
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
