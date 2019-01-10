import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import {
    LayoutActionTypes,
} from '../actions/layout.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LayoutEffects {

    // @Effect({ dispatch: false })
    // browswerErrorRedirect$ = this.actions$.pipe(
    //     ofType(LayoutActionTypes.BrowswerErrorRedirect),
    //     tap(() => this.router.navigate(['not-supported']))
    // );

    constructor(
        private actions$: Actions,
        private router: Router,
        private toastr: ToastrService
    ) { }
}
