import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, exhaustMap, tap } from 'rxjs/operators';

import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';

import * as _ from 'lodash';
import * as CourseActions from '../actions/course.actions';
import { Course, Lecture } from '@core/models/course';
import { BlockchainService } from '@shared/services/blockchain.service';

const COLLECTION_NAME = 'courses';

@Injectable()
export class CourseEffects {
  courseCollection: AngularFirestoreCollection<Course>;
  courses$: Observable<Course[]>;
  course$: Observable<Course>;

  @Effect({ dispatch: false })
  Create$ = this.actions$.pipe(
    ofType<CourseActions.Create>(CourseActions.ActionTypes.Create),
    map(action => action.payload),
    tap(async (course) => {
      const jsonObject = JSON.parse(JSON.stringify(course));
      const id = this.afs.createId();
      const courseObject: Course = { id, ...jsonObject };
      console.log(courseObject);
      
      const bcCourse = await this.blockchain.updateCourse(courseObject);
      const lecture: Lecture = _.find(courseObject.lectures, o => o.update);
      if (lecture) {
        const bcLecture = await this.blockchain.updateLecture(lecture, courseObject.id)
        if (bcLecture) {
          courseObject.lectures.forEach(lecture => bcLecture.id == lecture.id && (lecture.update = false))
        }
      }
      this.courseCollection.doc(id).set(courseObject);
    })
  );

  @Effect()
  Read$: Observable<Action> = this.actions$.pipe(
    ofType<CourseActions.Read>(CourseActions.ActionTypes.Read),
    exhaustMap(() => {
      return this.courses$.pipe(
        map(courses => new CourseActions.Complete(courses))
      );
    })
  );

  @Effect({ dispatch: false })
  Update$ = this.actions$.pipe(
    ofType<CourseActions.Update>(CourseActions.ActionTypes.Update),
    map(action => action.payload),
    tap(async (course) => {
      const bcCourse = await this.blockchain.updateCourse(course);
      const lecture: Lecture = _.find(course.lectures, o => o.update);
      if (lecture) {
        const bcLecture = await this.blockchain.updateLecture(lecture, course.id)
        if (bcLecture) {
          course.lectures.forEach(lecture => bcLecture.id == lecture.id && (lecture.update = false))
        }
      }
      this.courseCollection.doc(course.id).update(course);
    })
  );

  @Effect({ dispatch: false })
  Delete$ = this.actions$.pipe(
    ofType<CourseActions.Delete>(CourseActions.ActionTypes.Delete),
    map(action => action.payload),
    tap(async (course) => {
      const lecture: Lecture = _.find(course.lectures, o => o.delete);
      if (lecture) {
        await this.blockchain.deleteLecture(lecture.id);
      }
      await this.blockchain.deleteCourse(course.id);
      this.courseCollection.doc(course.id).delete();
    })
  );

  constructor(
    private actions$: Actions,
    private readonly afs: AngularFirestore,
    private blockchain: BlockchainService
  ) {
    this.courseCollection = this.afs.collection<Course>(COLLECTION_NAME);
    this.courses$ = this.courseCollection.valueChanges();
  }
}
