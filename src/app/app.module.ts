/* angular system moduleds */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* firebase moduleds */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

/* ngrx moduleds */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';

/* app moduleds */
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth/auth.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { CustomRouterStateSerializer } from '@core/utils/CustomRouterStateSerializer';

/* root component */
import { MainComponent } from '@core/containers/main/main.component';

/* others */
import { environment } from '../environments/environment';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({
      name: 'comodule-fe DevTools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    // NgxAuthFirebaseUIModule.forRoot(
    //   environment.firebase,
    //   () => 'app',
    //   {
    //     toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
    //     toastMessageOnAuthError: true // whether to open/show a snackbar message on auth error - default : true
    //   }),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    AuthModule.forRoot(),
    CoreModule,
    SharedModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
