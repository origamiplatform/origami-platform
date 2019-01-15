import { NgModule } from '@angular/core';

import { StorageService } from './storage.service';
import { CommonActionService } from './common-action.service';
import { CategoryService } from './category.service';


@NgModule({
    providers: [
        StorageService,
        CommonActionService,
        CategoryService
    ]
})
export class ServiceModule {}
