import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appPathIndicator]'
})
export class PathIndicatorDirective {
  @HostBinding('style.textDecoration') textDecoration = 'underline';
}
