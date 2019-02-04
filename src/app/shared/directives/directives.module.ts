import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PathIndicatorDirective } from './path-indicator.directive';


const DIRECTIVES = [
  PathIndicatorDirective
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirectivesModule { }
