import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appUserIcon]'
})
export class UserIconDirective {
  @HostBinding('style.height') height = '35px';
  @HostBinding('style.borderRadius') borderRadius = '50%';
}
