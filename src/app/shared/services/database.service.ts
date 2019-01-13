import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Category } from '@shared/models/database';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private categoryCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;

  constructor(private readonly  afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection<Category>('categories');
    this.categories = this.categoryCollection.valueChanges();
  }

  addCategory(category: Category) {
    this.categoryCollection.add(category);
  }

  updateCategory(category: Category) {
    this.categoryCollection.doc(category.name).update(category);
  }
}
