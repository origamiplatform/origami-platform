import { NgModule } from '@angular/core';

import { StorageService } from './storage.service';
import { CommonActionService } from './common-action.service';

@NgModule({
    providers: [
        StorageService,
        CommonActionService
    ]
})
export class ServiceModule {}
