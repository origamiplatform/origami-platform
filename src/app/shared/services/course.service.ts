import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as CourseActions from '@core/actions/course.actions';
import { Course } from '@core/models/course';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public courses$: Observable<Course[]>;

  constructor(
    private store: Store<fromRoot.State>,
    private readonly afs: AngularFirestore,
  ) {
    this.courses$ = this.store.pipe(select(fromRoot.getCourses));
    this.read();
  }

  create(course: Course): void {
    this.store.dispatch(new CourseActions.Create(course));
  }
  read(): void {
    this.store.dispatch(new CourseActions.Read());
  }
  update(course: Course): void {
    this.store.dispatch(new CourseActions.Update(course));
  }
  delete(course: Course): void {
    this.store.dispatch(new CourseActions.Delete(course));
  }
  getById(id: string): Observable<Course> {
    return this.afs.doc<Course>(`courses/${id}`).valueChanges();
  }
}
