import { Component, OnInit } from '@angular/core';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.courses$.subscribe(data => this.onCourseUpdate(data));
  }

  onCourseUpdate(courses: Course[]) {
    console.log(courses);

  }

}
