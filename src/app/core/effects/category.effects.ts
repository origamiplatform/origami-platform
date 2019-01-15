import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
    map,
    exhaustMap,
    catchError,
    tap,
} from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import * as CategoryActions from '../actions/category.actions';

import { Category } from '@shared/models/database';

const COLLECTION_NAME = 'categories';

@Injectable()
export class LayoutEffects {
    categoryCollection: AngularFirestoreCollection<Category>;
    categories: Observable<Category[]>;

    @Effect()
    CreateCategory$: Observable<Category[]> = this.actions$.pipe(
        ofType<CategoryActions.Create>(CategoryActions.ActionTypes.Create),
        map(action => action.payload),
        exhaustMap(category => {
            const id = this.afs.createId();
            this.categoryCollection.doc(id).set({ id, ...category });
            return this.categories.pipe(
                tap(categories => new CategoryActions.Complete(categories))
            );
        })
        // map((data: UserByPlatform) => (data.android.uniqueUserCount > 0 || data.ios.uniqueUserCount > 0) ? data : null),
        // map((data: any) => new LoadUserPerPlatformComplete(data)),
        // catchError(err => of(new Error({ target: 'platform', err: err })))
    );
    constructor(
        private actions$: Actions,
        private readonly afs: AngularFirestore,
        private toastr: ToastrService
    ) {
        this.categoryCollection = this.afs.collection<Category>(COLLECTION_NAME);
        this.categories = this.categoryCollection.valueChanges();
    }
}
