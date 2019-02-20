import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '@core/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, tap, map, exhaustMap } from 'rxjs/operators';
import { auth } from 'firebase';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null)),
      tap((userDoc: User) => {
        const user: User = {
          courses: [],
          ...userDoc
        };
        _.has(userDoc, 'courses') && (user.courses = userDoc.courses);
        this.updateUserData(user);
      }),
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    const user = {
      courses: [],
      ...credential
    };
    _.has(credential, 'courses') && (user.courses = user.courses);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData({ uid, email, displayName, photoURL, courses }: User ) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const update: User = {
      uid, email, displayName, photoURL, courses
    };
    return userRef.set(update, {merge: true});
  }

  enrollToCourse(courseId: string): Observable<void> {
    return this.user$.pipe(
      exhaustMap(user => {
        if (user.courses.includes(courseId)) { return of(null); }
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        user.courses.push(courseId);
        return userRef.set(user, { merge: true });
      })
    );
  }
}
