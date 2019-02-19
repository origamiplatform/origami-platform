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
import { Course } from '@core/models/course';

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
    tap(course => {
      const jsonObject = JSON.parse(JSON.stringify(course));
      const id = this.afs.createId();
      this.courseCollection.doc(id).set({ id, ...jsonObject });
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
    tap(course => {
      this.courseCollection.doc(course.id).update(course);
    })
  );

  @Effect({ dispatch: false })
  Delete$ = this.actions$.pipe(
    ofType<CourseActions.Delete>(CourseActions.ActionTypes.Delete),
    map(action => action.payload),
    tap(course => {
      this.courseCollection.doc(course.id).delete();
    })
  );

  constructor(
    private actions$: Actions,
    private readonly afs: AngularFirestore
  ) {
    this.courseCollection = this.afs.collection<Course>(COLLECTION_NAME);
    this.courses$ = this.courseCollection.valueChanges();
  }
}
