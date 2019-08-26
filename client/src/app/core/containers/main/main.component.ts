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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const MOCK_FRIENDS = [
  { img: 'assets/images/mock_users/1.jpg', name: 'Alice' },
  { img: 'assets/images/mock_users/2.jpg', name: 'Boe' },
  { img: 'assets/images/mock_users/3.jpg', name: 'Chary' },
  { img: 'assets/images/mock_users/4.jpg', name: 'Diana' },

];
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  routes: IRoutes[] = appConfig.routes;
  loading$: Observable<number>;
  router$: Observable<fromRouter.RouterReducerState<RouterStateUrl>>;
  user: User;
  calenderURL: SafeResourceUrl;


  friends = MOCK_FRIENDS;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private sanitizer: DomSanitizer,
    public auth: AuthService
  ) {
    this.loading$ = this.store.pipe(select(fromRoot.getLoading));
    this.auth.user$.subscribe(user => {
      if (user) {
        this.calenderURL = this.getCalenderURL(user);
      }
      this.user = user;

    });
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

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  getCalenderURL(user: User): SafeResourceUrl {
    const link = `https://calendar.google.com/calendar/embed?src=${user.email}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
}
