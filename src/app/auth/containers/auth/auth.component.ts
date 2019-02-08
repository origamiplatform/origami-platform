import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  onSuccess(event) {
    console.log(event);
  }

  onError(event) {
    console.error(event);
  }
}
