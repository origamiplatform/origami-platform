import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as LayoutActions from '@core/actions/layout.actions';
@Injectable({
  providedIn: 'root'
})
export class CommonActionService {
  constructor(private store: Store<fromRoot.State>) { }

  updateLoading(percentage: number): void {
    this.store.dispatch(new LayoutActions.UpdateLoading(percentage));
  }

  endLoading(): void {
    this.store.dispatch(new LayoutActions.EndLoading());
  }
}
