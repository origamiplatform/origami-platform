import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@shared/services/course.service';
import { Observable } from 'rxjs';
import { Course, Lecture } from '@core/models/course';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  @ViewChild('video') video;
  course$: Observable<Course>;
  lecture$: Observable<Lecture>;
  courseId: string;
  lectureId: string;
  previousLectureId: string;
  nextLectureId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    // this.courseId = this.route.snapshot.paramMap.get('courseId');
    // this.lectureId = this.route.snapshot.paramMap.get('lectureId');
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.lectureId = params['lectureId'];
      this.init();
    });
  }

  init() {
    this.course$ = this.courseService.getById(this.courseId);
    this.lecture$ = this.getLecture();
  }

  getLecture(): Observable<Lecture> {
    return this.course$.pipe(
      map(course => {
        let target: Lecture;
        course.lectures.forEach((lecture, i) => {
          if (lecture.id === this.lectureId) {
            target = lecture;
            this.setPreviousLecture(course.lectures, i);
            this.setNextLecture(course.lectures, i);
          }
        });
        return target;
      })
    );
  }

  setPreviousLecture(lectures: Lecture[], index: number) {
    const i = (index - 1);
    this.previousLectureId = (i >= 0) ? lectures[i].id : null;
  }

  setNextLecture(lectures: Lecture[], index: number) {
    const i = (index + 1);
    this.nextLectureId = (lectures.length > i) ? lectures[i].id : null;
  }

  end() {
    if (this.nextLectureId) {
      setTimeout(() => {
        this.router.navigate([`course/watch/${this.courseId}/${this.nextLectureId}`]);
      }, 1000);
    }
  }
}
