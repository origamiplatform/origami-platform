import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '@core/utils/CustomRouterStateSerializer';

import { IRoutes } from '@config/routes.config';
import { appConfig } from '@config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  routes: IRoutes[] = appConfig.routes;
  loading$: Observable<number>;
  router$: Observable<fromRouter.RouterReducerState<RouterStateUrl>>;
  currentUrl: string;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
  ) {
    this.loading$ = this.store.pipe(select(fromRoot.getLoading));
    // this.router$ = this.store.pipe(select(fromRoot.getRouterState));
    // this.router$.subscribe(state => this.onRouterUpdate(state));
  }

  // onRouterUpdate(router: fromRouter.RouterReducerState<RouterStateUrl>) {
  //   if (!router) { return; }
  //   this.currentUrl = router.state.url;
  // }
  showLink(onlyAdmin: boolean): boolean {
    // if (onlyAdmin) {
    //   if (!this.auth.authState) {
    //     return false;
    //   }
    // }
    return true;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // isCurrentRoute(value: string) {
  //   return this.currentUrl.includes(value);
  // }
}
