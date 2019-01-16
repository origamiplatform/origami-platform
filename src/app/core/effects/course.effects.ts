import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    map,
    exhaustMap,
} from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import * as _ from 'lodash';
import * as CourseActions from '../actions/course.actions';
import { Course } from '@core/models/course';

const COLLECTION_NAME = 'courses';

@Injectable()
export class CourseEffects {
    courseCollection: AngularFirestoreCollection<Course>;
    courses$: Observable<Course[]>;

    @Effect()
    Create$: Observable<Action> = this.actions$.pipe(
        ofType<CourseActions.Create>(CourseActions.ActionTypes.Create),
        map(action => action.payload),
        exhaustMap(course => {
            const id = this.afs.createId();
            this.courseCollection.doc(id).set({ id, ...course });
            return this.courses$.pipe(
                map(courses => new CourseActions.Complete(courses))
            );
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

    @Effect()
    Update$: Observable<Action> = this.actions$.pipe(
        ofType<CourseActions.Update>(CourseActions.ActionTypes.Update),
        map(action => action.payload),
        exhaustMap(course => {
            this.courseCollection.doc(course.id).update(course);
            return this.courses$.pipe(
                map(courses => new CourseActions.Complete(courses))
            );
        })
    );

    constructor(
        private actions$: Actions,
        private readonly afs: AngularFirestore,
    ) {
        this.courseCollection = this.afs.collection<Course>(COLLECTION_NAME);
        this.courses$ = this.courseCollection.valueChanges();
    }
}
