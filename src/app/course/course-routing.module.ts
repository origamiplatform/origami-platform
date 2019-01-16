import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './containers/course/course.component';
import { ExploreComponent } from './containers/explore/explore.component';

const routes: Routes = [
    {
        path: '',
        component: CourseComponent,
        children: [
            { path: '', redirectTo: 'explore', pathMatch: 'full' },
            { path: 'explore', component: ExploreComponent },
            // { path: 'posts/:id', component: PostViewComponent },
            // {
            //     path: 'dashboard',
            //     component: PostDashboardComponent,
            //     canActivate: [AuthGuard],
            // },
            { path: '**', redirectTo: 'explore' }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
