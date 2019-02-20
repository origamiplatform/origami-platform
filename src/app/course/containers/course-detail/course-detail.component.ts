import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '@core/models/course';
import { CourseService } from '@shared/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  course$: Observable<Course>;
  courseId: string;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.course$ = this.courseService.getObservableById(this.courseId);
  }

  enroll(): void {
    this.auth.enrollToCourse(this.courseId).subscribe();
  }
}
