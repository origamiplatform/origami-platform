import { Component, Input } from '@angular/core';
import { Course } from '@core/models/course';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: Observable<Course[]>;

  constructor(private router: Router) { }

  onClick(courseId) {
    console.log(`course/${courseId}`);

    this.router.navigate([`course/explore/${courseId}`]);
  }
}
