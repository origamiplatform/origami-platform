import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '@core/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { auth } from 'firebase';
import { BlockchainService } from './blockchain.service';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private blockchain: BlockchainService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => user == null ? of(null) : this.afs.doc<User>(`users/${user.uid}`).valueChanges())
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    await this.updateUserData(credential.user).toPromise();
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData({ uid, email, displayName, photoURL }: User): Observable<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    return this.user$.pipe(
      map(userDoc => {
        const update: User = {
          uid, email, displayName, photoURL,
        };

        if (userDoc) {
          update.admin = userDoc.admin || false;
          update.courses = userDoc.courses || [];
        }
        return update;
      }),
      tap(async (user) => await this.blockchain.updateUser(user)),
      switchMap(update => userRef.set(update, { merge: true })),
      catchError(e => of(e))
    );
  }

  enrollToCourse(courseId: string) {
    return this.user$.pipe(
      exhaustMap(async (user) => {
        if (user.courses.includes(courseId)) { return of(null); }
        const tx = await this.blockchain.enrollToCourse(courseId, user.uid);
        console.log(tx);
        
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        user.courses.push(courseId);
        return userRef.set(user, { merge: true });
      })
    );
  }
}
