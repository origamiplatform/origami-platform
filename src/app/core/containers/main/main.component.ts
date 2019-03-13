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
    public auth: AuthService
  ) {
    this.loading$ = this.store.pipe(select(fromRoot.getLoading));
  }


  showLink(onlyAdmin: boolean): boolean {
    if (onlyAdmin) {
      return this.auth.isAdmin;
    }
    return true;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
