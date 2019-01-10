import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

export const MODULES = [
    FlexLayoutModule,
    MaterialModule,
];

@NgModule({
    imports: MODULES,
    exports: MODULES,
})
export class ExternalModule {}
