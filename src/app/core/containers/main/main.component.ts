import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '@core/utils/CustomRouterStateSerializer';

import { IRoutes } from '@config/routes.config';
import { appConfig } from '@config/app.config';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@core/models/user';

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
  user: User;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    public auth: AuthService
  ) {
    this.loading$ = this.store.pipe(select(fromRoot.getLoading));
    this.auth.user$.subscribe(user => this.user = user);
  }


  showLink(route: IRoutes): boolean {
    if (!route.onlyLogin) { return true; }

    if (this.user) {
      if (route.onlyAdmin) {
        return this.user.admin;
      }
      if (route.onlyLogin) {
        return !!this.user;
      }
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
