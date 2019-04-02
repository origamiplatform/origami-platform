import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { CalenderComponent } from './calender/calender.component';
import { LogoComponent } from './logo/logo.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FriendListItemComponent } from './friend-list-item/friend-list-item.component';


export const COMPONENTS = [
    NavbarComponent,
    NavbarItemComponent,
    CalenderComponent,
    LogoComponent,
    FriendListItemComponent
];

@NgModule({
    imports: [
        SharedModule,
        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ComponentsModule { }
