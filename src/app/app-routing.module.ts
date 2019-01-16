import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'course', pathMatch: 'full' },
  {
    path: 'course',
    loadChildren: './course/course.module#CourseModule',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  },

  { path: '**', redirectTo: 'course' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
