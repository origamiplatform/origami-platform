import { Component, Input } from '@angular/core';

@Component({
  selector: 'friend-list-item',
  templateUrl: './friend-list-item.component.html',
  styleUrls: ['./friend-list-item.component.scss']
})
export class FriendListItemComponent {
  @Input() image: string;
  @Input() name: string;

  online: boolean;

  constructor(){
    this.online = Math.random() >= 0.5;    
  }
  isOnline() {
    return {
      'online': this.online
    }
  }
}
