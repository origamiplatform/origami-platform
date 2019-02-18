import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
    map,
    exhaustMap,
    tap,
    switchMap,
} from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import * as AuthActions from '../actions/auth.actions';
import { User } from '@auth/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

const COLLECTION_NAME = 'users';

@Injectable()
export class AuthEffects {
    user$: Observable<User>;

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
        private router: Router,
        private readonly afs: AngularFirestore,
        private readonly afAuth: AngularFireAuth
    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    console.log(user);
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }
}
