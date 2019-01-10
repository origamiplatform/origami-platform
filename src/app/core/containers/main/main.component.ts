import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as LayoutActions from '@core/actions/layout.actions';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  loading$: Observable<number>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.loading$ = this.store.pipe(select(fromRoot.getLoading));
  }

}
