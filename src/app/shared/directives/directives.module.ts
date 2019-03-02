import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PathIndicatorDirective } from './path-indicator.directive';
import { UserIconDirective } from './user-icon.directive';


const DIRECTIVES = [
  PathIndicatorDirective,
  UserIconDirective
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirectivesModule { }
