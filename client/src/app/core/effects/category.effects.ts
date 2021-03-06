import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    map,
    exhaustMap,
    tap,
} from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import * as _ from 'lodash';
import * as CategoryActions from '../actions/category.actions';
import { CategoryNode } from '@core/models/category';

const COLLECTION_NAME = 'categories';

@Injectable()
export class CategoryEffects {
    categoryCollection: AngularFirestoreCollection<CategoryNode>;
    categories$: Observable<CategoryNode[]>;

    @Effect({ dispatch: false })
    Create$ = this.actions$.pipe(
        ofType<CategoryActions.Create>(CategoryActions.ActionTypes.Create),
        map(action => action.payload),
        tap(category => {
            const jsonObject = JSON.parse(JSON.stringify(category));
            const id = this.afs.createId();
            this.categoryCollection.doc(id).set({ id, ...jsonObject });
        })
    );


    @Effect()
    Read$: Observable<Action> = this.actions$.pipe(
        ofType<CategoryActions.Read>(CategoryActions.ActionTypes.Read),
        exhaustMap(() => {
            return this.categories$.pipe(
                map(categories => new CategoryActions.Complete(categories))
            );
        })
    );

    @Effect({ dispatch: false })
    Update$ = this.actions$.pipe(
        ofType<CategoryActions.Update>(CategoryActions.ActionTypes.Update),
        map(action => action.payload),
        tap(category => {
            const jsonObject = JSON.parse(JSON.stringify(category));
            this.categoryCollection.doc(category.id).update(jsonObject);
        })
    );

    @Effect({ dispatch: false })
    Delete$ = this.actions$.pipe(
        ofType<CategoryActions.Delete>(CategoryActions.ActionTypes.Delete),
        map(action => action.payload),
        tap(category => {
            this.categoryCollection.doc(category.id).delete();
        })
    );

    constructor(
        private actions$: Actions,
        private readonly afs: AngularFirestore,
    ) {
        this.categoryCollection = this.afs.collection<CategoryNode>(COLLECTION_NAME);
        this.categories$ = this.categoryCollection.valueChanges();
    }
}
