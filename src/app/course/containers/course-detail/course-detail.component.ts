import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '@shared/services/course.service';
import { Course } from '@core/models/course';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private readonly afs: AngularFirestore,
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.course$ = this.afs.doc<Course>(`courses/${this.courseId}`).valueChanges();
  }

  ngOnInit() {
    console.log('courseId', this.courseId);
    // this.courseService.getOneById(this.courseId);
    // this.course$ = this.courseService.course$;
    // this.post$ = this.ssrFirestoreDoc(this.postId);
  }

  s(a) {
    return JSON.stringify(a);
  }

}
