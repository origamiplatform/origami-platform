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

import * as AuthActions from '../actions/auth.actions';
import { User } from '@auth/models/user';

const COLLECTION_NAME = 'users';

@Injectable()
export class AuthEffects {
    userCollection: AngularFirestoreCollection<User>;
    user$: Observable<User[]>;

    @Effect({ dispatch: false })
    Login$ = this.actions$.pipe(
        ofType<AuthActions.Login>(AuthActions.ActionTypes.Login),
        map(action => action.payload),
        tap(category => {
            // const jsonObject = JSON.parse(JSON.stringify(category));
            // const id = this.afs.createId();
            // this.categoryCollection.doc(id).set({ id, ...jsonObject });
        })
    );


    @Effect()
    Logout$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.Logout>(AuthActions.ActionTypes.Logout),
        // exhaustMap(() => {
        //     // return this.categories$.pipe(
        //     //     map(categories => new CategoryActions.Complete(categories))
        //     // );
        // })
    );

    @Effect({ dispatch: false })
    Register$ = this.actions$.pipe(
        ofType<AuthActions.Register>(AuthActions.ActionTypes.Register),
        map(action => action.payload),
        tap(category => {
            // const jsonObject = JSON.parse(JSON.stringify(category));
            // this.categoryCollection.doc(category.id).update(jsonObject);
        })
    );

    constructor(
        private actions$: Actions,
        private readonly afs: AngularFirestore,
    ) {
        this.userCollection = this.afs.collection<User>(COLLECTION_NAME);
        this.user$ = this.userCollection.valueChanges();
    }
}
