import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course$: Observable<Course>;
  courseId: string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log('courseId', this.courseId);
    this.courseService.getOneById(this.courseId);
    this.course$ = this.courseService.course$;
    // this.post$ = this.ssrFirestoreDoc(this.postId);
  }

}
