import { NgModule } from '@angular/core';

import { StorageService } from './storage.service';
import { CommonActionService } from './common-action.service';
import { CategoryService } from './category.service';
import { CourseService } from './course.service';


@NgModule({
    providers: [
        StorageService,
        CommonActionService,
        CategoryService,
        CourseService
    ]
})
export class ServicesModule {}
