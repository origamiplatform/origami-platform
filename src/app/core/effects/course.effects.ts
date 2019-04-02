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

      await this.blockchain.updateCourse(courseObject, true);

      const lecture: Lecture = _.find(courseObject.lectures, o => o.update);
      if (lecture) {
        const bcLecture = await this.blockchain.updateLecture(lecture, courseObject.id, true)
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
      const clone = _.cloneDeep(course);

      if (clone.update) {
        await this.blockchain.updateCourse(clone);
      }

      const lecture: Lecture = _.find(clone.lectures, o => o.update);
      if (lecture) {
        const bcLecture = await this.blockchain.updateLecture(lecture, clone.id)
        if (bcLecture) {
          clone.lectures.forEach(lecture => (bcLecture.id == lecture.id) && (lecture.update = false))
        }
      }
      this.courseCollection.doc(clone.id).update(clone);
    })
  );

  @Effect({ dispatch: false })
  Delete$ = this.actions$.pipe(
    ofType<CourseActions.Delete>(CourseActions.ActionTypes.Delete),
    map(action => action.payload),
    tap(async (course) => {
      const clone = _.cloneDeep(course);
      const lectures: Lecture[] = _.filter(clone.lectures, o => o.delete);
      if (lectures) {
        try {
          lectures.forEach(async (lecture) => await this.blockchain.deleteLecture(lecture.id))
        } catch (e) { }
        this.courseCollection.doc(clone.id).update(clone);
      }

      if (course.delete) {
        try {
          await this.blockchain.deleteCourse(clone.id);
        } catch (e) { }
        this.courseCollection.doc(clone.id).delete();
      }
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
