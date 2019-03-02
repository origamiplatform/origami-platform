import { Component, OnInit } from '@angular/core';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';

@Component({
  selector: 'app-course-explore',
  templateUrl: './course-explore.component.html',
  styleUrls: ['./course-explore.component.scss']
})
export class CourseExploreComponent implements OnInit {

  constructor(public courseService: CourseService) { }

  ngOnInit() {
    this.courseService.courses$.subscribe(data => this.onCourseUpdate(data));
  }

  onCourseUpdate(courses: Course[]) {
    console.log(courses);
  }
}
