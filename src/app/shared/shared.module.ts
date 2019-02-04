import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';
import { ExternalModule } from './externals/external.module';
import { ServiceModule } from './services/service.module';
import { DirectivesModule } from './directives/directives.module';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  ComponentsModule,
  DirectivesModule,
  ExternalModule,
  ServiceModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService] },
        // { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      ]
    };
  }
}
