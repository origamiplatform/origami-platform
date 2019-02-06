import { Component, OnInit } from '@angular/core';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  constructor(public courseService: CourseService) { }

  ngOnInit() {
    this.courseService.courses$.subscribe(data => this.onCourseUpdate(data));
  }

  onCourseUpdate(courses: Course[]) {
    console.log(courses);

  }
}
