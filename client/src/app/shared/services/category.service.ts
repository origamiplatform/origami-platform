import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as CategoryActions from '@core/actions/category.actions';
import { CategoryNode } from '@core/models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories$: Observable<CategoryNode[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.categories$ = this.store.pipe(select(fromRoot.getCategories));
    this.read();
  }

  create(category: CategoryNode): void {
    this.store.dispatch(new CategoryActions.Create(category));
  }
  read(): void {
    this.store.dispatch(new CategoryActions.Read());
  }
  update(category: CategoryNode): void {
    this.store.dispatch(new CategoryActions.Update(category));
  }
  delete(category: CategoryNode): void {
    this.store.dispatch(new CategoryActions.Delete(category));
  }
}
