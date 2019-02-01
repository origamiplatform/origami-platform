import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './containers/course/course.component';
import { ExploreComponent } from './containers/explore/explore.component';
import { CourseDetailComponent } from './containers/course-detail/course-detail.component';

const routes: Routes = [
    {
        path: '',
        component: CourseComponent,
        children: [
            { path: '', redirectTo: 'explore', pathMatch: 'full' },
            { path: 'explore', component: ExploreComponent },
            { path: 'explore/:id', component: CourseDetailComponent },
            { path: '**', redirectTo: 'explore' }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
