import { AuthService } from '@shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-enrolled',
  templateUrl: './course-enrolled.component.html',
  styleUrls: ['./course-enrolled.component.scss']
})
export class CourseEnrolledComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
