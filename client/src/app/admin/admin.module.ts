import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from './components/components.module';

import { AdminComponent } from './containers/admin/admin.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const CONTAINERS = [
  AdminComponent,
  DashboardComponent
];

@NgModule({
  imports: [
    AdminRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
})
export class AdminModule { }
