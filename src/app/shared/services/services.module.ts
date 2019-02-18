import { NgModule } from '@angular/core';

import { StorageService } from './storage.service';
import { CommonActionService } from './common-action.service';
import { CategoryService } from './category.service';
import { CourseService } from './course.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@NgModule({
    providers: [
        AuthService,
        AuthGuard,
        StorageService,
        CommonActionService,
        CategoryService,
        CourseService
    ]
})
export class ServicesModule {}
