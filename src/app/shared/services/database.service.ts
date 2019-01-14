import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference } from '@angular/fire/firestore';
import { Category } from '@shared/models/database';
import { tap, map } from 'rxjs/operators';
import * as _ from 'lodash';

const COLLECTION_NAME = 'categories';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  categoryCollection: AngularFirestoreCollection<Category>;
  categories: BehaviorSubject<Category[]>;
  // categories: Observable<Category[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection<Category>(COLLECTION_NAME);
    this.categoryCollection.valueChanges().subscribe(data => this.categories = new BehaviorSubject(data));

    // this.categories.subscribe(data => console.log('change', data));
  }

  addCategory(category: Category) {
    const id = this.afs.createId();
    this.categoryCollection.doc(id).set({ id, ...category });
  }

  updateCategory(category: Category) {
    // Hot vs Cold Observable problem on firebase
    // AngularFirestoreCollection can be only subscribed once
    // Later subscriptions will get nothing
    // That's why overriding function using behaviour subject here
    const doc = _.find(this.categories.value, (o: Category) => o.name === category.name);
    this.categoryCollection.doc(doc.id).update(category);
    // this.afs.collection<Category>(COLLECTION_NAME, ref => ref.where('id', '==', category.id))
    //   .valueChanges()
    //   .pipe(
    //     map((docs: Category[]) => docs[0]),
    //     // map((docs: Category[]) => _.find(docs, (o: Category) => o.name === category.name)),
    //     tap((doc: Category) => this.categoryCollection.doc(doc.id).update(category))
    //   ).subscribe();
  }
}
