import { Component, OnInit, Host, ElementRef } from '@angular/core';

@Component({
  selector: 'navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent {

  constructor(private elRef: ElementRef) {

  }

  isSelected(): boolean {
    return this.elRef.nativeElement.classList.contains('selected');
  }
}
