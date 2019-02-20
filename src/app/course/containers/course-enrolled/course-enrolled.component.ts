import { Course } from '@core/models/course';
import { CourseService } from '@shared/services/course.service';
import { AuthService } from '@shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  catchError,
  map,
  switchMap,
} from 'rxjs/operators';
import { of, zip, Observable } from 'rxjs';

@Component({
  selector: 'app-course-enrolled',
  templateUrl: './course-enrolled.component.html',
  styleUrls: ['./course-enrolled.component.scss']
})
export class CourseEnrolledComponent implements OnInit {
  courses$: Observable<Course>;

  constructor(public auth: AuthService, public courseService: CourseService) {}

  ngOnInit() {
    this.courses$ = this.auth.user$
      .pipe(
        map(user => {
          if (!user.courses || user.courses.length === 0) {
            throw new Error('User has not enrolled to any course');
          }
          return user.courses;
        }),
        map(ids => ids.map(id => this.courseService.getById(id))),
        switchMap( courses$ => {
          return zip(...courses$);
        }),
        catchError(e => of(e))
      );
  }
}
