import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

import { MatVideoModule } from 'mat-video';

export const MODULES = [
    FlexLayoutModule,
    MaterialModule,
    MatVideoModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES,
})
export class ExternalModule {}
