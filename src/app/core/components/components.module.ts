import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';

export const COMPONENTS = [
    NavbarComponent,
    NavbarItemComponent
];

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ComponentsModule { }
