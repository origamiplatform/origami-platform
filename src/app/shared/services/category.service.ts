import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as CategoryActions from '@core/actions/category.actions';
import { Category } from '@shared/models/database';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories$: Observable<Category[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.categories$ = this.store.pipe(select(fromRoot.getCategories));
    this.read();
  }

  create(category: Category): void {
    this.store.dispatch(new CategoryActions.Create(category));
  }
  read(): void {
    this.store.dispatch(new CategoryActions.Read());
  }
  update(category: Category): void {
    this.store.dispatch(new CategoryActions.Update(category));
  }
  delete(category: Category): void {
    this.store.dispatch(new CategoryActions.Delete(category));
  }
}
