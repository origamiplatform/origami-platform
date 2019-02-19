import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '@core/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import * as firebase 'firebase';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.updateUserData(user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  async updateUserData({ uid, email, displayName, photoURL }: User ): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const options: GetOptions = { source: 'server' };
    // const document = userRef.get('uid');

    console.log(document);

    const user = await userRef.ref.get();
    console.log(user);

    const courses = this.user.courses || [];
    const update: User = {
      uid, email, displayName, photoURL, courses
    };
    this.user = update;
    return userRef.set(update, {merge: true});
  }

  async enrollToCourse(courseId: string) {
    if (this.user.courses.includes(courseId)) { return; }
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.user.uid}`);
    const courses = _.clone(this.user.courses);
    courses.push(courseId);
    const update: User = {
      courses: courses,
      ...this.user
    };
    return userRef.set(update, { merge: true });
  }
}
