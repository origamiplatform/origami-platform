import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './containers/course/course.component';
import { CourseDetailComponent } from './containers/course-detail/course-detail.component';
import { CourseEnrolledComponent } from './containers/course-enrolled/course-enrolled.component';
import { CourseExploreComponent } from './containers/course-explore/course-explore.component';
import { VideoPlayerComponent } from './containers/video-player/video-player.component';

const routes: Routes = [
    {
        path: '',
        component: CourseComponent,
        children: [
            { path: '', redirectTo: 'explore', pathMatch: 'full' },
            { path: 'enrolled', component: CourseEnrolledComponent },
            { path: 'explore', component: CourseExploreComponent },
            { path: 'explore/:id', component: CourseDetailComponent },
            { path: 'watch/:courseId/:lectureId', component: VideoPlayerComponent },
            { path: '**', redirectTo: 'explore' }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
