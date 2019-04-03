import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() theme: string = 'dark';
  constructor() { }

  ngOnInit() {
  }

  getTheme(){
    return { 'dark': this.theme == 'dark', 'light': this.theme == 'light' }
  }
}
