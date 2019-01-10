import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalModule } from '@shared/externals/external.module';

import { FileUploadButtonComponent } from './file-upload-button/file-upload-button.component';

const COMPONENTS = [
  FileUploadButtonComponent
];

@NgModule({
  imports: [
    CommonModule,
    ExternalModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
