import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'course', pathMatch: 'full' },
  {
    path: 'course',
    loadChildren: './course/course.module#CourseModule',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  },

  { path: '**', redirectTo: 'course' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
