import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  course$: Observable<Course>;
  lecture$: Observable<Lecture>;
  courseId: string;
  lectureId: string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
    ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.lectureId = this.route.snapshot.paramMap.get('lectureId');
    this.course$ = this.courseService.getById(this.courseId);
    this.lecture$ = this.getLecture();
  }

  getLecture(): Observable<Lecture> {
    return this.course$.pipe(
      map(course => _.find(course.lectures, o => o.id == this.lectureId))
    )
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CourseService } from '@shared/services/course.service';
// import { Observable } from 'rxjs';
// import { Course, Lecture } from '@core/models/course';
// import { map, tap } from 'rxjs/operators';
// import * as _ from 'lodash';

// @Component({
//   selector: 'app-video-player',
//   templateUrl: './video-player.component.html',
//   styleUrls: ['./video-player.component.scss']
// })
// export class VideoPlayerComponent implements OnInit {
//   course$: Observable<Course>;
//   lecture$: Observable<Lecture>;
//   courseId: string;
//   lectureId: string;

//   constructor(
//     private route: ActivatedRoute,
//     private courseService: CourseService
//   ) {
//     this.courseId = this.route.snapshot.paramMap.get('courseId');
//     this.lectureId = this.route.snapshot.paramMap.get('lectureId');
//     this.course$ = this.courseService.getById(this.courseId).pipe(
//       tap(course => {
//         let a = _.find(course.lectures, o => o.id == this.lectureId);
//         console.log('here');

//         console.log(a);

//         return a
//       })
//     );
//   }

//   getLectureById(): Observable<Lecture> {
//     return this.course$.pipe(
//       map(course => {
//         let a = _.find(course.lectures, o => o.id == this.lectureId);
//         console.log('here');

//         console.log(a);

//         return a
//       })
//     )
//   }

//   ngOnInit() {
//   }

// }
