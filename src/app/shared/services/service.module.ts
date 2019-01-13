import { NgModule } from '@angular/core';

import { StorageService } from './storage.service';
import { DatabaseService } from './database.service';
import { CommonActionService } from './common-action.service';


@NgModule({
    providers: [
        StorageService,
        DatabaseService,
        CommonActionService
    ]
})
export class ServiceModule {}
