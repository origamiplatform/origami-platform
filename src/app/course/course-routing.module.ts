import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './containers/course/course.component';
import { CourseDetailComponent } from './containers/course-detail/course-detail.component';
import { CourseListComponent } from './containers/course-list/course-list.component';
import { CourseEnrolledComponent } from './containers/course-enrolled/course-enrolled.component';

const routes: Routes = [
    {
        path: '',
        component: CourseComponent,
        children: [
            { path: '', redirectTo: 'explore', pathMatch: 'full' },
            { path: 'enrolled', component: CourseEnrolledComponent },
            { path: 'explore', component: CourseListComponent },
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
